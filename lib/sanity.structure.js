import {
  RiHome4Line,
  RiLayoutBottom2Line,
  RiLayoutTop2Line,
  RiListCheck,
  RiMailSendLine,
  RiMedalFill,
  RiParentLine,
  RiSettings5Line,
} from "react-icons/ri";

export const structure = (S) => {
  return S.list()
    .title("Website")
    .items([
      // Frontpage
      S.listItem()
        .title("Frontpage")
        .icon(RiHome4Line)
        .child(
          S.editor()
            .id("frontpage")
            .schemaType("frontpage")
            .documentId("frontpage")
        ),
      // Content documents
      S.listItem()
        .title("Pages")
        .icon(RiListCheck)
        .child(S.documentTypeList("page").title("Pages")),
      S.divider(),
      S.listItem()
        .title("Competences")
        .icon(RiMedalFill)
        .child(S.documentTypeList("competence").title("Competences")),
      S.listItem()
        .title("Employees")
        .icon(RiParentLine)
        .child(S.documentTypeList("employee").title("Employees")),
      S.listItem()
        .title("Forms")
        .icon(RiMailSendLine)
        .child(S.documentTypeList("form").title("Forms")),
      S.divider(),
      S.listItem()
        .title("Header")
        .icon(RiLayoutTop2Line)
        .child(
          S.editor().id("header").schemaType("header").documentId("header")
        ),
      S.listItem()
        .title("Footer")
        .icon(RiLayoutBottom2Line)
        .child(
          S.editor().id("footer").schemaType("footer").documentId("footer")
        ),
      S.listItem()
        .title("Settings")
        .icon(RiSettings5Line)
        .child(
          S.editor()
            .id("settings")
            .schemaType("settings")
            .documentId("settings")
        ),
    ]);
};
