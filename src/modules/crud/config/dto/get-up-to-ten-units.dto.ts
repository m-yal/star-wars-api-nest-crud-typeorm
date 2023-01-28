import { Units, UpToTenUnitsPage } from "src/common/types/types";

export class GetUpToTenUnitsDto<Unit extends Units> {
    data: UpToTenUnitsPage<Unit>;
}