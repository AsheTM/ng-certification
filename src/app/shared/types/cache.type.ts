import { HttpResponse } from "@angular/common/http";

export type TCache = Record<string, HttpResponse<unknown>>;
