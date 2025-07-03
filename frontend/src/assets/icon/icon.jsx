import COSidebar from "./cosidebar";
import Home from "./home";
import Link from "./link";
import Rupay from "./rupay";
import Megaphone from "./megaphone";
import Template from "./template";
import DoubleChat from "./doublechat";
import Gear from "./gear";
import OutArrow from "./outarrow";
import CoinStack from "./coinstack";
import Plus from "./plus";
import DuplicateDoc from "./duplicatedoc";
import Airplane from "./airplane";
import Warning from "./warning";
import Trash from "./trash";
import ArrowLeft from "./arrowleft"
import Shofify from "./shofify";
import Meta from "./meta";
import Amazon from "./amazon";
import ChevronDown from "./chevrondown";
import RoundCheck from "./roundcheck"
import ArrowRight from "./arrowright";
import { Check } from "./check";
import Truck from "./truck";
import Box from "./box";
import Gurentee from "./gurentee";
import Pencil from "./pencil";
import Sparkales from "./sparkales";
import Google from "./google";

const icons = {
    cosidebar: <COSidebar/>,
    home : <Home/>,
    rupay:<Rupay/>,
    link:<Link/>,
    megaphone:<Megaphone/>,
    template:<Template/>,
    doublechat:<DoubleChat/>,
    gear:<Gear/>,
    outarrow:<OutArrow/>,
    coinstack:<CoinStack/>,
    plus: <Plus/>,
    duplicatedoc: <DuplicateDoc/>,
    airplane:<Airplane/>,
    warning:<Warning/>,
    trash:<Trash/>,
    arrowleft:<ArrowLeft/>,
    shopify: <Shofify/>,
    meta:<Meta/>,
    amazon:<Amazon/>,
    chevrondown:<ChevronDown/>,
    roundcheck:<RoundCheck/>,
    arrowright:<ArrowRight/>,
    check:<Check/>,
    truck:<Truck/>,
    box:<Box/>,
    gurentee:<Gurentee/>,
    pencil:<Pencil/>,
    sparkales:<Sparkales/>,
    google:<Google/>
};

const Icon = ({icon}) => {
  return icons[icon]
}

export default Icon