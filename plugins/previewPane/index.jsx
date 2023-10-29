import { PreviewPane } from "./PreviewPane";

export const previewDocumentNode = ({
  apiVersion,
  previewSecretId,
  types: _types,
}) => {
  const types = new Set(_types);

  return (S, { schemaType }) => {
    if (types.has(schemaType)) {
      return S.document().views([
        S.view.form(),
        S.view
          .component((props) => (
            <PreviewPane
              previewSecretId={previewSecretId}
              apiVersion={apiVersion}
              {...props}
            />
          ))
          .title("Preview"),
      ]);
    }

    return null;
  };
};
