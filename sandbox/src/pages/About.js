import { useContext } from "react";
import { userTokenContext } from './../components/contexts.js';

export function About() {
    //let setter = useContext(userTokenContext);

    //setter('zmieniono');

    return (
      <div>
        <h2>About</h2>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam aliquet, purus vitae eleifend tristique, lorem magna volutpat orci, et vehicula erat erat nec elit. Aenean posuere nunc ac cursus facilisis. Aenean vel porta turpis, ut iaculis justo.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam aliquet, purus vitae eleifend tristique, lorem magna volutpat orci, et vehicula erat erat nec elit. Aenean posuere nunc ac cursus facilisis. Aenean vel porta turpis, ut iaculis justo.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam aliquet, purus vitae eleifend tristique, lorem magna volutpat orci, et vehicula erat erat nec elit. Aenean posuere nunc ac cursus facilisis. Aenean vel porta turpis, ut iaculis justo.
      </div>
    );
  }
;