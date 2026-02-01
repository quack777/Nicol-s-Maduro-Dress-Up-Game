import { useMemo, useRef, useState } from "react";
import { toPng } from "html-to-image";
import { BOTTOMS, SHOES, TOPS, type Item, type Slot, useDressStore } from "./store";

const CATEGORY_MAP: { slot: Slot; title: string; items: Item[] }[] = [
  { slot: "top", title: "Top", items: TOPS },
  { slot: "bottom", title: "Bottom", items: BOTTOMS },
  { slot: "shoes", title: "Shoes", items: SHOES },
];

export default function App() {
  const stageRef = useRef<HTMLDivElement>(null);
  const { topId, bottomId, shoesId, setSlot, setPreset, randomize } = useDressStore();
  const [saving, setSaving] = useState(false);

  const selected = useMemo(() => {
    const top = TOPS.find((item) => item.id === topId);
    const bottom = BOTTOMS.find((item) => item.id === bottomId);
    const shoes = SHOES.find((item) => item.id === shoesId);
    return { top, bottom, shoes };
  }, [topId, bottomId, shoesId]);

  const handleSave = async () => {
    if (!stageRef.current || saving) return;
    try {
      setSaving(true);
      const dataUrl = await toPng(stageRef.current, {
        cacheBust: true,
        backgroundColor: "#f6f5f0",
      });
      const link = document.createElement("a");
      link.download = "maduro-fit.png";
      link.href = dataUrl;
      link.click();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#fff4da,_#f6f5f0_45%,_#efe8d7_100%)] px-10 py-10">
      <div className="mx-auto grid max-w-6xl grid-cols-[420px_1fr] gap-10">
        <section>
          <div className="mb-4">
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">meme fit lab</p>
            <h1 className="text-3xl font-semibold">Nicol's Maduro Dress-Up</h1>
          </div>
          <div
            ref={stageRef}
            className="relative h-[560px] w-[420px] overflow-hidden rounded-3xl border border-neutral-200 bg-[linear-gradient(135deg,_#ffe9c7,_#f8f4ff)] shadow-[0_24px_60px_rgba(26,26,26,0.18)]"
          >
            <img
              src="/assets/body-base.png"
              alt="body base"
              className="absolute inset-0 z-10 h-full w-full object-contain"
              draggable={false}
            />
            <div className="absolute left-1/2 top-6 z-50 h-28 w-28 -translate-x-1/2 overflow-hidden rounded-full border-4 border-white bg-white shadow-[0_12px_30px_rgba(10,10,10,0.2)]">
              <img
                src="/assets/body.png"
                alt="Maduro head"
                className="h-full w-full object-cover object-top"
                draggable={false}
              />
            </div>
            {selected.bottom && (
              <img
                src={selected.bottom.src}
                alt={selected.bottom.name}
                className="absolute inset-0 z-20 h-full w-full object-contain"
                draggable={false}
              />
            )}
            {selected.top && (
              <img
                src={selected.top.src}
                alt={selected.top.name}
                className="absolute inset-0 z-30 h-full w-full object-contain"
                draggable={false}
              />
            )}
            {selected.shoes && (
              <img
                src={selected.shoes.src}
                alt={selected.shoes.name}
                className="absolute inset-0 z-40 h-full w-full object-contain"
                draggable={false}
              />
            )}
          </div>
          <p className="mt-3 text-sm text-neutral-500">PNG layers · drag-free · pure chaos</p>
        </section>

        <section className="space-y-6">
          <div className="rounded-2xl border border-neutral-200 bg-white/70 p-6 shadow-[0_10px_30px_rgba(10,10,10,0.08)] backdrop-blur">
            <div className="flex flex-wrap gap-3">
              <button
                className="rounded-full bg-black px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5"
                onClick={setPreset}
              >
                Nike Tech Fleece
              </button>
              <button
                className="rounded-full border border-black px-4 py-2 text-sm font-semibold text-black transition hover:-translate-y-0.5"
                onClick={randomize}
              >
                Random Fit
              </button>
              <button
                className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-700 transition hover:-translate-y-0.5"
                onClick={handleSave}
              >
                {saving ? "Saving..." : "Save PNG"}
              </button>
            </div>
          </div>

          {CATEGORY_MAP.map((category) => (
            <div key={category.slot} className="rounded-2xl border border-neutral-200 bg-white p-6">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-lg font-semibold">{category.title}</h2>
                <span className="text-xs uppercase tracking-[0.3em] text-neutral-400">{category.slot}</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {category.items.map((item) => {
                  const isActive =
                    (category.slot === "top" && item.id === topId) ||
                    (category.slot === "bottom" && item.id === bottomId) ||
                    (category.slot === "shoes" && item.id === shoesId);
                  return (
                    <button
                      key={item.id}
                      className={`rounded-xl border px-3 py-3 text-left text-sm font-medium transition ${
                        isActive
                          ? "border-black bg-black text-white"
                          : "border-neutral-200 bg-neutral-50 text-neutral-700 hover:-translate-y-0.5"
                      }`}
                      onClick={() => setSlot(category.slot, item.id)}
                    >
                      <div className="text-xs uppercase tracking-[0.2em] opacity-60">{item.id}</div>
                      <div className="mt-2">{item.name}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
