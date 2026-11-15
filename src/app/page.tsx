import Statement from "@/components/statement";
import DeliveryLoopFigure from "@/components/figures/delivery-loop-figure";
import FigureIndex from "@/components/figure-index";
import References from "@/components/references";
import SelectedTalks from "@/components/selected-talks";

export default function Page() {
  return (
    <main id="main-content" className="sheet">
      <Statement />
      <DeliveryLoopFigure readHref="/projects/loopworks" />
      <FigureIndex />
      <SelectedTalks />
      <References />
    </main>
  );
}
