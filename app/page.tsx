import fs from "node:fs";
import path from "node:path";
import EnquiryForm from "../components/EnquiryForm";

export const dynamic = "force-static";

function part(name: string) {
  return fs.readFileSync(path.join(process.cwd(), "components", name), "utf8");
}

export default function Page() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: part("pre.html") }} />
      <div id="enquiry" className="sec" style={{ padding: "88px 24px", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: "1240px", display: "flex", flexWrap: "wrap", gap: "48px" }}>
          <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: part("enq_left.html") }} />
          <EnquiryForm />
        </div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: part("post.html") }} />
    </>
  );
}
