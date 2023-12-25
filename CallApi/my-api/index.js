const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors()); // Sử dụng middleware CORS
app.use(express.json());
app.use('/image', express.static('public/image'));

// Dữ liệu mẫu - Thay đổi để có 14 sản phẩm
const products = [
  { id: 1, name: 'Cà phê lá', price: 25, description: 'Đậm chất cà phê, hương thơm sánh mịn', image: './image/cf1.jpg' },
  { id: 2, name: 'Cà phê muối', price: 40, description: 'Đậm chất cà phê, hương thơm sánh mịn', image: './image/cf2.jpg' },
  { id: 3, name: 'Cà phê tuyết', price: 15, description: 'Đậm chất cà phê, hương thơm sánh mịn', image: './image/cf3.jpg' },
  { id: 4, name: 'Cà phê sữa', price: 30, description: 'Đậm chất cà phê, hương thơm sánh mịn', image: './image/cf4.jpg' },
  { id: 5, name: 'Cà phê dão', price: 20, description: 'Đậm chất cà phê, hương thơm sánh mịn', image: './image/cf5.jpg' },
  { id: 6, name: 'Cà phê mưa', price: 35, description: 'Đậm chất cà phê, hương thơm sánh mịn', image: './image/cf6.jpg' },
  { id: 7, name: 'Cà phê đen', price: 45, description: 'Đậm chất cà phê, hương thơm sánh mịn', image: './image/cf7.jpg' },
  { id: 8, name: 'Cà phê ngọt', price: 40, description: 'Đậm chất cà phê, hương thơm sánh mịn', image: './image/cf8.jpg' },
];

// Route để lấy danh sách sản phẩm
app.get('/api/products', (req, res) => {
  const productsWithFormattedPrice = products.map(product => ({
    ...product,
    price: product.price.toFixed(3), // Định dạng giá tiền với 3 số 0 ngoài sau dấu phẩy
    imagePath: `/image${product.image}`, // Sửa đường dẫn ảnh
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

  const productWithFormattedPrice = {
    ...product,
    price: product.price.toFixed(3), // Định dạng giá tiền với 3 số 0 ngoài sau dấu phẩy
    imagePath: `/image${product.image}`, // Sửa đường dẫn ảnh
  };

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
