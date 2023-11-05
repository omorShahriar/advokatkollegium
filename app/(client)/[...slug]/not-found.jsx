import { Button, Text } from "components";
import React from "react";

export default function NotFound() {
  return (
    <React.Fragment>
      <section className="mt-24">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-6">
          <Text as="h1" size="display" className="text-center">
            Her skjedde det noe krøll
          </Text>
          <Text size="subheading" className="text-center">
            Vi fant ikke siden du leter etter. Sjekk at du skrev inn riktig link
            eller gå tilbake til forsiden for å finne det du leter etter.
          </Text>
          <Button
            link={{
              title: "Tilbake til forsiden",
              url: "/",
              pageType: "frontpage",
            }}
            className="mt-8"
            withIcon
          />
        </div>
      </section>
    </React.Fragment>
  );
}
