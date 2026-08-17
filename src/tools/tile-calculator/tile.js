(function () {
  "use strict";

  const unitSelect = document.getElementById("tl-unit");
  const lengthInput = document.getElementById("tl-length");
  const widthInput = document.getElementById("tl-width");
  const tileLInput = document.getElementById("tl-tile-l");
  const tileWInput = document.getElementById("tl-tile-w");
  const groutInput = document.getElementById("tl-grout");
  const wasteInput = document.getElementById("tl-waste");
  const boxCountInput = document.getElementById("tl-box-count");

  const outTotalTiles = document.getElementById("out-tl-total-tiles");
  const outBoxes = document.getElementById("out-tl-boxes");
  const outArea = document.getElementById("out-tl-area");
  const outCoverage = document.getElementById("out-tl-coverage");
  const outSingleTile = document.getElementById("out-tl-single-tile");

  const unitRoomLabels = document.querySelectorAll(".unit-room");
  const unitTileLabels = document.querySelectorAll(".unit-tile");
  const unitGroutLabels = document.querySelectorAll(".unit-grout");

  function calc() {
    const isFt = unitSelect.value === "ft";

    unitRoomLabels.forEach(el => el.textContent = isFt ? "ft" : "m");
    unitTileLabels.forEach(el => el.textContent = isFt ? "in" : "cm");
    unitGroutLabels.forEach(el => el.textContent = isFt ? "in" : "mm");

    const roomL = parseFloat(lengthInput.value) || 0;
    const roomW = parseFloat(widthInput.value) || 0;
    const tileL = parseFloat(tileLInput.value) || 0;
    const tileW = parseFloat(tileWInput.value) || 0;
    const grout = parseFloat(groutInput.value) || 0;
    const wastePct = Math.max(0, parseFloat(wasteInput.value) || 0);
    const tilesPerBox = Math.max(1, parseInt(boxCountInput.value, 10) || 1);

    // Floor area
    let floorAreaSqFt = isFt ? (roomL * roomW) : (roomL * roomW * 10.7639);
    let floorAreaNet = roomL * roomW;

    // Single tile dimensions in feet/meters plus grout
    let tileLInMeters = isFt ? (tileL / 12) : (tileL / 100);
    let tileWInMeters = isFt ? (tileW / 12) : (tileW / 100);
    let groutInMeters = isFt ? (grout / 12) : (grout / 1000);

    let effectiveTileArea = (tileLInMeters + groutInMeters) * (tileWInMeters + groutInMeters);
    let rawTileAreaNoGrout = tileLInMeters * tileWInMeters;

    let singleTileSqFt = isFt ? (tileL * tileW / 144) : (tileL * tileW / 10000);

    let roomAreaForCalc = isFt ? floorAreaNet : (roomL * roomW);
    let rawTilesNeeded = effectiveTileArea > 0 ? (roomAreaForCalc / effectiveTileArea) : 0;
    let totalTilesWithWaste = Math.ceil(rawTilesNeeded * (1 + wastePct / 100));
    let totalBoxesNeeded = Math.ceil(totalTilesWithWaste / tilesPerBox);

    let totalCoverageNeeded = floorAreaNet * (1 + wastePct / 100);

    outTotalTiles.textContent = totalTilesWithWaste + " Tiles";
    outBoxes.textContent = totalBoxesNeeded + " Boxes";
    outArea.textContent = floorAreaNet.toFixed(1) + (isFt ? " sq ft" : " m²");
    outCoverage.textContent = totalCoverageNeeded.toFixed(1) + (isFt ? " sq ft" : " m²");
    outSingleTile.textContent = singleTileSqFt.toFixed(2) + (isFt ? " sq ft / tile" : " m² / tile");
  }

  [unitSelect, lengthInput, widthInput, tileLInput, tileWInput, groutInput, wasteInput, boxCountInput].forEach(el => {
    if (el) el.addEventListener("input", calc);
    if (el) el.addEventListener("change", calc);
  });

  calc();
})();
