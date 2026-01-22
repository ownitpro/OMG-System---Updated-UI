import Page from "@/components/layout/Page";

export default function Install() {
  return (
    <Page title="Install the app">
      <div className="card p-5 space-y-4">
        <p>Download from <b>securevaultdocs.com</b>. We support:</p>
        <ul className="list-disc pl-5 text-sm">
          <li>Desktop: Windows, macOS, Linux</li>
          <li>Web App (PWA): Install from your browser</li>
        </ul>
        <div className="text-xs text-muted-foreground">iOS/Android native installers are not offered. Use the PWA.</div>
      </div>
    </Page>
  );
}

