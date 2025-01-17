import PageHeader from "../_components/page-header";
// import Breadcrumbs from "../_components/breadcrumbs";

export default function Page() {
  return (
    <>
      {/* <Breadcrumbs
        items={[{ item: "Home", path: "/home" }, { item: "Dashboard" }]}
      /> */}

      <PageHeader
        title="Home"
        actions={[{ label: "Add", target: "/home" }]}
        description="Home page to track all data"
      />

      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </>
  );
}
