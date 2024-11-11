import DTitleRowText from "./components/homeScreen/DTitleRowText";
import {Button} from "./components/ui/button";

const features = [
  {
    title: "Effortless Bill Splitting",
    description:
      "No more complicated math or awkward conversations—our app makes splitting expenses between friends simple and accurate. Just add an expense, split it, and let us handle the rest.",
  },
  {
    title: "Track, Settle and Relax",
    description:
      "Keep track of who paid for what, settle debts with a click, and enjoy the moments without the worry of unsettled bills. Our intuitive interface keeps all transactions transparent and fair.",
  },
  {
    title: "Custom Splits for Every Situation",
    description:
      " Whether it’s an even split, custom shares, or splitting by percentage, we’ve got it covered. Create a balance that works for everyone, no matter the scenario.",
  },
  {
    title: "Smart Reminders and Notifcations",
    description:
      "Stay on top of expenses and payments with helpful reminders and notifications. Never forget a balance and keep things clear, convenient, and on time.",
  },
];
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="space-y-32 px-4 sm:px-8 md:px-16 xl:w-3/4 xl:px-0">
        <div className="flex flex-col items-center lg:flex-row">
          <div className="flex-1"></div>

          <div className="flex w-full flex-col items-center justify-center gap-4 lg:w-1/2">
            <h1 className="mb-4 text-center text-5xl font-semibold">
              Share the expenses, simplify the friendships.
            </h1>
            <Button className="w-3/4 font-bold">Get Started</Button>
            <Button className="primary-color-text w-3/4 border-2 font-bold" variant="outline">
              I already have an account
            </Button>
          </div>
        </div>

        <div className="space-y-16 pb-32">
          {features.map((feature, index) => (
            <DTitleRowText
              key={feature.title}
              title={feature.title}
              description={feature.description}
              separator={index !== features.length - 1}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
