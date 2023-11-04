import { BlockContent, Text } from "../elements";
import Expertise from "../elements/Expertise";

export default function AreaOfExpertise(props) {
  const { subHeading, heading, description, expertises } = props;

  return (
    <section>
      <div>
        <div>
          <Text size="subHeading">{subHeading}</Text>
          <div className="flex justify-between mt-4">
            <Text as="h2" size="display" className="py-0 max-w-2xl">
              {heading}
            </Text>
            <div className="max-w-lg">
              <BlockContent value={description} />
            </div>
          </div>
        </div>
        <div className="md:mt-20 mt-10 grid grid-cols-12 gap-3">
          {expertises.map((expertise) => (
            <div key={expertise._id} className="col-span-12 md:col-span-4">
              <Expertise {...expertise} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
