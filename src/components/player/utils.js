import { STATUS_ENUM } from "./Status";
export function getStatus(url, ready) {
    if (url) {
        return ready ? STATUS_ENUM.ready : STATUS_ENUM.loading;
    } else return STATUS_ENUM.idle;
}
