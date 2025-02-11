import { Logo } from '@/components/logo'

export default function Home() {
  return (
    <div className="container min-h-[30vh] flex items-center justify-center py-12">
      <section className="flex flex-col items-center gap-4 text-center">
        <Logo className="h-32 w-32" />
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl">walnut & clack</h1>
          <p className="text-xl">artisanal wooden keyboard cases</p>
        </div>
      </section>
    </div>
  );
}
