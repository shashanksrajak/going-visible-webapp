"use server";

import { db } from "../firebase/config";
import { doc, getDoc, setDoc, updateDoc, addDoc, serverTimestamp, collection, query, where, Timestamp, getDocs, orderBy } from "firebase/firestore";
import dayjs from "dayjs";
import { currentUser } from "./user-auth";
import { revalidatePath } from "next/cache";
import { uploadImageFirebase } from "../firebase/storage";

export async function addMoodLog(userId, moodText, moodData, file = null) {
    try {
        const userRef = doc(db, "users", userId);
        const moodLogsCollection = collection(userRef, "moodLogs");

        const userData = (await getDoc(userRef)).data()

        let image = '';
        if (file) {
            // upload image to firebase
            image = await uploadImageFirebase(file)
        }

        await addDoc(moodLogsCollection, {
            ...moodData,
            mood: moodText,
            image,
            timestamp: serverTimestamp()
        });

        const moodLogsQS = await getDocs(moodLogsCollection);
        const moodsCount = moodLogsQS.size;

        console.log("Mood log added successfully.");

        // Update weekly streak
        await updateWeeklyStreak(userId);


        // Award First and Positive Moods Badge
        if (moodsCount === 1) {
            // Award First Mood Logged Badge
            await updateDoc(userRef,
                { badges: { ...userData.badges, firstMoodLogBadge: 1 } });

        }

        // Get mood logs for the day to award Positive Mood Badge
        // Award this badge if user logs ALL 10 positive mood in a day
        if (moodsCount === 10) {
            const moodLogsToday = await getMoodLogsForDay(userId, new Date());
            let positiveMood = 0;
            moodLogsToday.forEach(mood => {
                if (mood.mood_sentiment === 'POSITIVE') {
                    positiveMood++;
                }
            });

            if (positiveMood === 10) {
                // Award the badge
                await updateDoc(userRef,
                    { badges: { ...userData.badges, positiveDayBadge: userData.badges?.positiveDayBadge + 1 } });
            }
        }


        revalidatePath("/dashboard")

        return true;
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Something went wrong!"
        }
    }
}

export async function getMoodLogsForDay(userId, date) {
    const userRef = doc(db, "users", userId);
    const moodLogsCollection = collection(userRef, "moodLogs");

    // Calculate start and end of the day
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const dayQuery = query(
        moodLogsCollection,
        where("timestamp", ">=", Timestamp.fromDate(startOfDay)),
        where("timestamp", "<=", Timestamp.fromDate(endOfDay)),
        orderBy("timestamp", "desc")
    );

    const querySnapshot = await getDocs(dayQuery);
    const moods = []
    querySnapshot.forEach((doc) => {
        console.log(doc.id, "=>", doc.data());
        moods.push({ ...doc.data(), timestamp: doc.data().timestamp.toDate().toLocaleString(), })
    });

    return moods;
}

export async function checkMoodLogAllowed() {
    const user = await currentUser();

    const userRef = doc(db, "users", user.uid);
    const moodLogsCollection = collection(userRef, "moodLogs");

    // Calculate start and end of the day
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const dayQuery = query(
        moodLogsCollection,
        where("timestamp", ">=", Timestamp.fromDate(startOfDay)),
        where("timestamp", "<=", Timestamp.fromDate(endOfDay))
    );

    const querySnapshot = await getDocs(dayQuery);
    const moods = []
    querySnapshot.forEach((doc) => {
        console.log(doc.id, "=>", doc.data());
        moods.push({ ...doc.data(), timestamp: doc.data().timestamp.toDate().toLocaleString(), })
    });

    const moodCount = moods.length;

    console.log('mood count', moodCount)

    if (moodCount > process.env.MOOD_LOG_LIMIT) {
        return false;
    } else {
        return true;
    }

}

export async function getMoodLogsForMonth(userId, selectedMonth) {
    const moodLogsRef = collection(db, 'users', userId, 'moodLogs');

    // Get start and end of the month using dayjs
    const start = dayjs(selectedMonth).startOf('month').toDate();
    const end = dayjs(selectedMonth).endOf('month').toDate();

    // Query to get mood logs within the month range
    const q = query(moodLogsRef, where('timestamp', '>=', Timestamp.fromDate(start)), where('timestamp', '<=', Timestamp.fromDate(end)));

    const querySnapshot = await getDocs(q);

    const moodLogs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), timestamp: doc.data().timestamp.toDate().toLocaleString() }));

    return moodLogs;
}


// Weekly Streak

// Function to calculate the week number of the year for a given date
const getWeekNumber = (date) => {
    const start = new Date(date.getFullYear(), 0, 1);
    const diff = date - start + (start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000;
    const oneWeek = 604800000; // One week in milliseconds
    return Math.floor(diff / oneWeek);
};

// Function to get all dates for the current week
const getCurrentWeekDates = () => {
    const currentDate = new Date();
    const firstDayOfWeek = currentDate.getDate() - currentDate.getDay(); // Sunday as the first day
    const dates = [];

    for (let i = 0; i < 7; i++) {
        const date = new Date(currentDate);
        date.setDate(firstDayOfWeek + i);
        dates.push(date);
    }

    return dates;
};

// Function to update the weekly streak for a user
export async function updateWeeklyStreak(userId) {
    try {
        const userRef = doc(db, "users", userId);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
            const userData = userDoc.data();
            const currentWeek = getWeekNumber(new Date());
            const lastLoggedWeek = userData.lastLoggedWeek || currentWeek;
            let newStreak = userData.weeklyStreak || 0;

            const weekDates = getCurrentWeekDates();
            let allDaysLogged = true;

            // Check mood logs for each day of the current week
            for (const date of weekDates) {
                const moodLogsCollection = collection(userRef, "moodLogs");
                const startOfDay = new Date(date);
                startOfDay.setHours(0, 0, 0, 0);
                const endOfDay = new Date(date);
                endOfDay.setHours(23, 59, 59, 999);

                const dayQuery = query(
                    moodLogsCollection,
                    where("timestamp", ">=", Timestamp.fromDate(startOfDay)),
                    where("timestamp", "<=", Timestamp.fromDate(endOfDay))
                );

                const querySnapshot = await getDocs(dayQuery);
                if (querySnapshot.empty) {
                    allDaysLogged = false; // If any day is not logged, set to false
                    break;
                }
            }

            // Update streak based on full week logging
            if (currentWeek !== lastLoggedWeek) {
                if (allDaysLogged) {
                    if (currentWeek === lastLoggedWeek + 1) {
                        newStreak += 1; // Increment streak if logging consecutively
                    } else {
                        newStreak = 1; // Reset if a week was skipped
                    }
                } else {
                    newStreak = 0; // Reset streak if the week is not fully logged
                }
            }

            await updateDoc(userRef, {
                weeklyStreak: newStreak,
                lastLoggedWeek: currentWeek,
                badges: {
                    ...userData.badges,
                    weeklyStreakBadge: newStreak
                }
            });
        } else {
            // Initialize user's streak data if the document doesn't exist
            await setDoc(userRef, {
                weeklyStreak: 1,
                lastLoggedWeek: getWeekNumber(new Date()),
            });
        }
    } catch (error) {
        console.error("Error updating weekly streak:", error);
    }
};



