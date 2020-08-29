"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tileResult = void 0;
function tileResult(data) {
    if (typeof data === 'object') {
        if (Array.isArray(data)) {
            const t = [];
            for (let i = 0; i < data.length; i += 1) {
                t.push(tileResult(data[i]));
            }
            return t;
        }
        const result = {};
        const keys = Object.keys(data);
        for (let i = 0; i < keys.length; i += 1) {
            const key = keys[i];
            // eslint-disable-next-line no-continue
            if (key === '_id')
                continue;
            const item = data[key];
            if (typeof item === 'object') {
                if (Array.isArray(item)) {
                    result[key] = tileResult(item);
                }
                else {
                    const temp = tileResult(item);
                    const tempKeys = Object.keys(temp);
                    for (let k = 0; k < tempKeys.length; k += 1) {
                        const tempKey = tempKeys[k];
                        result[`${key}.${tempKey}`] = temp[tempKey];
                    }
                }
            }
            else {
                result[key] = item;
            }
        }
        return result;
    }
    return data;
}
exports.tileResult = tileResult;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uZ29vc2UtdXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2ZXIvbW9uZ29vc2UvbW9uZ29vc2UtdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxTQUFnQixVQUFVLENBQUUsSUFBUztJQUdsQyxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTtRQUMzQixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDdEIsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ2IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDdEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUM5QjtZQUNELE9BQU8sQ0FBQyxDQUFDO1NBQ1g7UUFHRCxNQUFNLE1BQU0sR0FFUixFQUFFLENBQUM7UUFFUCxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9CLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDdEMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLHVDQUF1QztZQUN2QyxJQUFJLEdBQUcsS0FBSyxLQUFLO2dCQUFFLFNBQVM7WUFDNUIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxFQUFFO2dCQUMzQixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQ3RCLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ2pDO3FCQUFNO29CQUNKLE1BQU0sSUFBSSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDOUIsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDbkMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTt3QkFDMUMsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUM1QixNQUFNLENBQUMsR0FBRyxHQUFHLElBQUksT0FBTyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7cUJBQzlDO2lCQUNIO2FBQ0g7aUJBQU07Z0JBQ0osTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQzthQUNyQjtTQUNIO1FBQ0QsT0FBTyxNQUFNLENBQUM7S0FDaEI7SUFDRCxPQUFPLElBQUksQ0FBQztBQUNmLENBQUM7QUF6Q0QsZ0NBeUNDIn0=