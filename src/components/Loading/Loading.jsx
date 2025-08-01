import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import shoppingBag from "../../assets/animations/shopping.lottie"

export default function Loading() {
  return (
  <>
    <div className="flex justify-center items-center h-screen">
      <DotLottieReact
        src={shoppingBag}
        loop
        autoplay
        style={{ width: 300, height: 300 }}
      />
    </div>
  </>
  )
}
