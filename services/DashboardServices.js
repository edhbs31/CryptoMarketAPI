'use strict'
class DashboardService {
    async FilterData(data,query) {
        const result = [];
        for(var items of data) {
            const filter = await this.FilterText(items.name, query)
            if(filter == true) {
                result.push(items)
            }
        }
        return result
    }

    async FilterText(text,query) {
        if(text.includes(query)){
            return true
        }
        return false
    }
}

module.exports = DashboardService