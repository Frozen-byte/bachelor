import {Generator} from "./generator";
import {HelperFunction} from "./helperfunction";
/**
 * Created by Patrick on 07.02.2017.
 */

export interface DownloadGenerator {

  entity:Generator[]
  mj: HelperFunction[]
  vf: HelperFunction[]
}
