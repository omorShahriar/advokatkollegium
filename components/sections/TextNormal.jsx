import { BlockContent } from "components/elements";

export function TextNormal({ text, sectionId }) {
  if (!text) return null;

  return (
    <section id={sectionId}>
      <div className="mx-auto max-w-3xl">
        <BlockContent value={text} />
      </div>
    </section>
  );
}
