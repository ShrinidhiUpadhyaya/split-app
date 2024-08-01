export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="space-y-16 border border-[red] p-16">
        <div className="flex flex-col items-center justify-center gap-4 border border-[red]">
          <h1 className="w-3/4 text-center text-4xl font-bold">
            {" "}
            Effortlessly Share and Track Expenses with Friends{" "}
          </h1>

          <p className="text-lg font-light">
            Split bills, settle debts, and manage your group expenses seamlessly.
          </p>
        </div>

        <div className="flex w-full gap-8 border border-[red]">
          <div className="h-96 w-96 rounded-xl bg-white"></div>
          <div className="flex-1">Feature 1</div>
        </div>

        <div className="flex w-full gap-8 border border-[red]">
          <div className="flex-1">Feature 2</div>
          <div className="h-96 w-96 rounded-xl bg-white"></div>
        </div>

        <div className="flex w-full gap-8 border border-[red]">
          <div className="h-96 w-96 rounded-xl bg-white"></div>

          <div className="flex-1">Feature 3</div>
        </div>

        <div className="flex w-full gap-8 border border-[red]">
          <div className="flex-1">
            <h4>Feature 4</h4>
          </div>
          <div className="h-96 w-96 rounded-xl bg-white"></div>
        </div>
      </div>
    </main>
  );
}
