import { useState } from "react";
import styles from "./../styles/components/toggleCheckbox.module.scss"

export const ToggleCheckbox = () => {
  const [checked, setChecked] = useState(false);

  return(
    <div className={styles.container}>
      <input type="checkbox" onChange={()=>setChecked(!checked)}/>
    </div>
  )
}