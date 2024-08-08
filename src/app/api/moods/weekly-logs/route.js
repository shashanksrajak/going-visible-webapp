import { collection, query, where, getDocs, doc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { currentUser } from "@/lib/server-actions/user-auth";

export async function GET(request) {
    // fetch current user
    const user = await currentUser();

    const userRef = doc(db, "users", user.uid);
    const moodLogsCollection = collection(userRef, "moodLogs");

    const currentWeekDates = getCurrentWeekDates();
    const startOfWeek = currentWeekDates[0];
    const endOfWeek = currentWeekDates[6];

    const weekQuery = query(
        moodLogsCollection,
        where("timestamp", ">=", Timestamp.fromDate(startOfWeek)),
        where("timestamp", "<=", Timestamp.fromDate(endOfWeek))
    );

    const querySnapshot = await getDocs(weekQuery);
    const moodLogs = [];

    querySnapshot.forEach((doc) => {
        moodLogs.push(doc.data().timestamp.toDate());
    });

    return Response.json({ logs: moodLogs, weeklyStreak: user.weeklyStreak || 0 });
};

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
