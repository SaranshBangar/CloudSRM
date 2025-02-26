import { ThemeSwitcher } from "@/components/theme-switcher";

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-foreground">CloudSRM</h1>
          <ThemeSwitcher />
        </header>

        <p className="text-foreground/80">Your cloud storage solution</p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 bg-card rounded-lg border border-border shadow-drop-1">
            <h2 className="text-xl font-semibold text-card-foreground">Files</h2>
            <p className="mt-2 text-card-foreground/80">Manage your files and folders.</p>
          </div>

          <div className="p-6 bg-primary rounded-lg shadow-drop-1">
            <h2 className="text-xl font-semibold text-primary-foreground">Upload</h2>
            <p className="mt-2 text-primary-foreground/80">Upload new files to your cloud.</p>
          </div>

          <div className="p-6 bg-secondary rounded-lg shadow-drop-1">
            <h2 className="text-xl font-semibold text-secondary-foreground">Shared</h2>
            <p className="mt-2 text-secondary-foreground/80">Files shared with you.</p>
          </div>
        </div>

        <div className="p-6 bg-accent rounded-lg shadow-drop-1">
          <h2 className="text-xl font-semibold text-accent-foreground">Storage Usage</h2>
          <p className="mt-2 text-accent-foreground/80">View and manage your storage quota.</p>
        </div>
      </div>
    </main>
  );
}
