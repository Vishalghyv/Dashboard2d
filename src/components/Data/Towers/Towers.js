const data = require('./Towers.json');

function getAllTowers(data) {
    let allTowers = [];
    for (let tower in data) {
        allTowers.push({"id": tower, "Lat": data[tower].Lat, "Lon": data[tower].Lon});
    }
    return allTowers;
}

function getAllCells(data) {
    let allCells = [];
    for (let tower in data) {
        for (let cell in data[tower].Cells) {
            allCells.push({"id": cell, "Lat": data[tower].Cells[cell].Lat, "Lon": data[tower].Cells[cell].Lon});
        }
    }
    return allCells;
}

function getCellIdsToTowerId(data) {
    let cellIdsToTowerId = {};
    for (let tower in data) {
        for (let cell in data[tower].Cells) {
            cellIdsToTowerId[cell] = {"id": tower, "Lat": data[tower].Lat, "Lon": data[tower].Lon};
        }
    }
    return cellIdsToTowerId;
}

export const towers = getAllTowers(data);
export const cells = getAllCells(data);
export const cellIdsToTower= getCellIdsToTowerId(data);
