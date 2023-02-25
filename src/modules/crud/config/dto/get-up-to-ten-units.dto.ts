import { Units, UpToTenUnitsPage } from "../../../../common/types/types";

export class GetUpToTenUnitsDto<Unit extends Units> {
    data: UpToTenUnitsPage<Unit>;
}