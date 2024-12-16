import Identity from "@/components/Plaid/Identity";
import Slider from "@/components/UI/Changer";

export default function () {
  return (
    <div className="flex flex-col gap-12 justify-center items-center min-h-[100vh]">
      <Identity />
      <Slider />
    </div>
  );
}
