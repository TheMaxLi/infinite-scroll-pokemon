"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.static('public'));
app.use(express_1.default.static('dist'));
app.get('/', (req, res) => {
    res.render(path_1.default.join(__dirname, "../", 'public', 'index.html'));
});
app.get('/dist/frontend.js', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'frontend.js'));
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
