const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors()); // Sử dụng middleware CORS
app.use(express.json());
app.use('/image', express.static('public/image'));

// Dữ liệu mẫu - Thay đổi để có 14 sản phẩm
const products = [
  { id: 1, name: 'Cà phê lá', price: 25, description: 'Đậm chất cà phê, hương thơm sánh mịn', image: './image/cf1.jpg', categoryId: 1 },
  { id: 2, name: 'Cà phê muối', price: 40, description: 'Đậm chất cà phê, hương thơm sánh mịn', image: './image/cf2.jpg', categoryId: 1 },
  { id: 3, name: 'Cà phê tuyết', price: 15, description: 'Đậm chất cà phê, hương thơm sánh mịn', image: './image/cf3.jpg', categoryId: 1 },
  { id: 4, name: 'Cà phê sữa', price: 30, description: 'Đậm chất cà phê, hương thơm sánh mịn', image: './image/cf4.jpg' , categoryId: 1},
  { id: 5, name: 'Trà chanh giã tay', price: 20, description: 'Đậm chất cà phê, hương thơm sánh mịn', image: './image/cf5.jpg' , categoryId: 2},
  { id: 6, name: 'Trà chanh chua', price: 35, description: 'Đậm chất cà phê, hương thơm sánh mịn', image: './image/cf6.jpg', categoryId: 2},
  { id: 7, name: 'Lục trà', price: 45, description: 'Đậm chất cà phê, hương thơm sánh mịn', image: './image/cf7.jpg', categoryId: 2 },
  { id: 8, name: 'Trà đá', price: 40, description: 'Đậm chất cà phê, hương thơm sánh mịn', image: './image/cf8.jpg', categoryId: 2 },
];
const categories = [
  { id: 1, name: 'Cà phê' },
  { id: 2, name: 'Trà chanh' }
  // Add more categories as needed
];
app.get('/api/categories', (req, res) => {
  res.json(categories);
});

// Route để lấy danh sách sản phẩm theo danh mục
app.get('/api/products/category/:categoryId', (req, res) => {
  const categoryId = parseInt(req.params.categoryId);
  const filteredProducts = products.filter(product => product.categoryId === categoryId);
  res.json(filteredProducts);
});

// Route để lấy danh sách sản phẩm
app.get('/api/products', (req, res) => {
  const productsWithFormattedPrice = products.map(product => ({
    ...product,
    price: Number(product.price).toFixed(3), // Chuyển đổi giá tiền thành số và thêm 3 số 0
    imagePath: `/image${product.image}`,
  }));
  res.json(productsWithFormattedPrice);
});

// Route để lấy chi tiết sản phẩm theo ID
app.get('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const productsWithFormattedPrice = products.map(product => ({
    ...product,
    price: parseFloat(product.price).toFixed(3), // Chuyển đổi giá tiền thành số và thêm 3 số 0
    imagePath: `/image${product.image}`,
  }));
  

  res.json(productWithFormattedPrice);
});

const users = []; // Lưu trữ thông tin người dùng đã đăng ký
app.get('/api/users', (req, res) => {
  res.json(users);
});

app.post('/api/signup', (req, res) => {
  const { username, password } = req.body;

  // Kiểm tra xem tên người dùng đã tồn tại chưa
  if (users.find(user => user.username === username)) {
    return res.json({ success: false, error: 'Tên người dùng đã tồn tại.' });
  }

  // Lưu thông tin người dùng đã đăng ký
  users.push({ username, password });
  console.log('User signed up:', { username, password });
  res.json({ success: true });
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Kiểm tra xem thông tin người dùng có trùng khớp hay không
  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
    res.json({ success: true });
  } else {
    res.json({ success: false, error: 'Tên người dùng hoặc mật khẩu không đúng.' });
  }
});

// Chạy server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});