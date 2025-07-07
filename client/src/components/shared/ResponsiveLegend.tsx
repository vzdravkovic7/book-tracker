import React, { useEffect, useState } from "react";

interface LegendItem {
  name: string;
  color?: string;
}

interface Props {
  items: LegendItem[];
  defaultColors?: string[];
}

const defaultPalette = [
  "#7fc97f",
  "#beaed4",
  "#fdc086",
  "#ffff99",
  "#386cb0",
  "#f0027f",
];

const ResponsiveLegend: React.FC<Props> = ({
  items,
  defaultColors = defaultPalette,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  if (!isMobile) {
    return (
      <div className="mt-4 flex flex-wrap justify-center gap-4">
        {items.map((item, index) => (
          <div
            key={item.name}
            className="flex items-center gap-2 text-sm text-textAccept dark:text-textLight"
          >
            <span
              className="inline-block w-4 h-4 rounded-full"
              style={{
                backgroundColor:
                  item.color || defaultColors[index % defaultColors.length],
              }}
            ></span>
            {item.name}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-4 flex flex-col items-center relative w-full">
      <button
        onClick={() => setDropdownOpen((prev) => !prev)}
        className="text-sm px-4 py-2 rounded-2xl hover:rounded-lg transition-all duration-300 
        bg-primary text-white hover:bg-secondary 
        dark:bg-blue-400 dark:hover:bg-blue-600 dark:text-gray-900"
      >
        {dropdownOpen ? "Hide Legend" : "Show Legend"}
      </button>

      {dropdownOpen && (
        <div className="mt-2 w-60 max-h-60 overflow-y-auto scrollbar-hide bg-backgroundLight dark:bg-background shadow-lg rounded-lg p-4 z-10">
          {items.map((item, index) => (
            <div
              key={item.name}
              className="flex items-center gap-2 text-sm mb-2 text-textAccept dark:text-textLight"
            >
              <span
                className="inline-block w-4 h-4 rounded-full"
                style={{
                  backgroundColor:
                    item.color || defaultColors[index % defaultColors.length],
                }}
              ></span>
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResponsiveLegend;
