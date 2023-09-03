import { Button } from "./Button"
import { useNavigate } from "react-router-dom"
export const BackButton = () => {
    const navigate = useNavigate();
    return(
        <div>
            <Button
          onClick={()=>navigate(-1)}
          type={"back"}>
            &larr; Back
          </Button>
        </div>
    )
}

