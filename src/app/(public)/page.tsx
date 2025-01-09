import Hero from "./_components/Hero";
import { Alert } from "@/components/ui/alert";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] }>;
}) {
  // read query params
  const { signedOut = false } = await searchParams;

  return (
    <div>
      {signedOut && (
        <Alert status="success" title="Signed Out">
          Thanks for using going visible. We hope to see you again soon!
        </Alert>
      )}
      <Hero />
    </div>
  );
}
