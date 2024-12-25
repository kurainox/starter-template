export default function CustomIcon({
  children,
  className,
  paths,
  size,
  background,
  viewBox = "0 0 24 24",
}) {
  return (
    <div
      style={{
        backgroundColor: background,
        padding: "8px",
        borderRadius: "10px",
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
      >
        {paths.map((pathData, index) => (
          <path
            key={index}
            d={pathData.d}
            fill={pathData.fill || "currentColor"}
          />
        ))}
      </svg>
    </div>
  );
}
