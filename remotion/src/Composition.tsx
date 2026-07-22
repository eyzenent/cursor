import { AbsoluteFill, CalculateMetadataFunction, Composition } from "remotion";

type Props = {
  title: string;
};

const calculateMetadata: CalculateMetadataFunction<Props> = () => {
  return {
    props: {
      title: "ASAD",
    },
  };
};

export const MyComposition = () => {
  return (
    <Composition
      id="MyComp"
      component={MyComponent}
      durationInFrames={90}
      fps={30}
      width={1920}
      height={1080}
      defaultProps={{
        title: "ASAD",
      }}
      calculateMetadata={calculateMetadata}
    />
  );
};

export const MyComponent: React.FC<Props> = ({ title }) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0b1c2c",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Georgia, 'Times New Roman', serif",
      }}
    >
      <div
        style={{
          color: "#f2efe8",
          fontSize: 120,
          letterSpacing: "0.12em",
          fontWeight: 700,
        }}
      >
        {title}
      </div>
      <div
        style={{
          marginTop: 24,
          color: "#9fb3c8",
          fontSize: 36,
          letterSpacing: "0.04em",
        }}
      >
        Remotion hazır
      </div>
    </AbsoluteFill>
  );
};
