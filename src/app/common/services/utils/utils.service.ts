import { Injectable } from "@angular/core";
import { Logger } from "@nsalaun/ng-logger";

@Injectable({
  providedIn: "root",
})
export class UtilsService {
  private static readonly TAG = "UtilsService";

  constructor(
    private logger: Logger
  ) {}

  /**
   * json对象转查询字符串
   */
  jsonToQueryString(queryJson: object) {
    let queryString = "";
    if (queryJson == null) {
      return queryString;
    }
    for (const key in queryJson) {
      if (queryJson.hasOwnProperty(key)) {
        let value = queryJson[key];
        if (value == null) {
          continue;
        }
        if (Array.isArray(value) || typeof value === "object") {
          value = JSON.stringify(value);
        }

        if (value != null) {
          queryString += `&${key}=${value}`;
        }
      }
    }
    return queryString ? queryString.substr(1) : queryString;
  }
}
