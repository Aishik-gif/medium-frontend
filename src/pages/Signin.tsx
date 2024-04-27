import { Auth } from "../components/Auth"
import { Quote } from "../components/Quote"

export const Signin = ()=>{
  return(
    <div className="grid lg:grid-cols-2">
      <div className="flex justify-center items-center">
        <Auth type="signin" />
      </div>
      <div className="hidden lg:block">
        <Quote />
      </div>
    </div>
  )
}