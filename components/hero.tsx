import NextLogo from "./next-logo";
import SupabaseLogo from "./supabase-logo";

export default function Header() {
  return (
      <div className="flex flex-col gap-16 items-center">
          <div className="flex gap-8 justify-center items-center">

          </div>
          <h1 className="sr-only">Supabase and Next.js Starter Template</h1>
          <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center flex flex-col">
             <span className={'mb-[40px]'}>Witamy na</span>  <span className = 'font-bold lg:text-5xl'>PoradnikEnergetyczny.pl.</span>
              <span className={'mt-[40px]'}>Strona obecnie znajduje się w budowie</span>
          </p>

          <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8"/>
      </div>
  );
}
