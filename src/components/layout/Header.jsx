import Container from "../ui/Container";
export default function Header({
  isInverted = false,
  indicatorInverted = false,
  indicatorCount = 0,
  indicatorIndex = 0,
  onIndicatorSelect,
}) {
  const progressPercent =
    indicatorCount > 1 ? (indicatorIndex / (indicatorCount - 1)) * 100 : 0;

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur transition-colors duration-150 ${
        isInverted
          ? "bg-black/90"
          : "bg-background-primary/90"
      }`}
    >
      <Container className="flex items-center justify-between gap-4 py-3">
        <a
          href="#work"
          className={`shrink-0 text-sm font-semibold uppercase tracking-[0.18em] transition-colors ${
            isInverted ? "!text-white" : "text-text-secondary"
          }`}
          style={isInverted ? { color: "#fff" } : undefined}
        >
          Lin Latt
        </a>

        <div className="ml-auto w-[min(48vw,20rem)]">
          <div className="relative py-1">
            <div className="relative">
              <div
                className={`absolute top-1/2 -translate-y-1/2 h-[2px] rounded-full ${
                  indicatorInverted ? "bg-white/35" : "bg-text-secondary/28"
                }`}
                style={{
                  left: "0",
                  right: "0",
                  width: "100%",
                }}
                aria-hidden="true"
              >
                <span
                  className={`absolute left-0 top-0 h-[2px] rounded-full transition-[width] duration-300 ease-out ${
                    indicatorInverted ? "bg-white" : "bg-black"
                  }`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <div className="relative flex items-center justify-between">
                {Array.from({ length: indicatorCount }).map((_, idx) => {
                  const isActive = idx === indicatorIndex;
                  const isCrossed = idx < indicatorIndex;
                  return (
                    <button
                      key={`header-indicator-${idx}`}
                      type="button"
                      aria-label={`Go to section ${idx + 1}`}
                      onClick={() => onIndicatorSelect?.(idx)}
                      className={`h-2 w-2 rounded-full transition relative z-10 flex-shrink-0 ${
                        isCrossed
                          ? "opacity-0 pointer-events-none"
                          : indicatorInverted
                            ? isActive
                              ? "bg-white"
                              : "bg-white/45 hover:bg-white/70"
                            : isActive
                              ? "bg-black"
                              : "bg-black/35 hover:bg-black/60"
                      }`}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}