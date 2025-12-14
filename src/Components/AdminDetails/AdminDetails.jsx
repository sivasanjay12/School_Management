// import React from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   Button,
//   Nav,
//   Navbar,
//   Form,
//   InputGroup,
//   Badge,
//   ProgressBar,
// } from "react-bootstrap";

// const AdminDashboard = () => {
//   const navigate = useNavigate();

//   // Sidebar navigation items from your previous code
//   const navItems = [
//     { name: "Admin Dashboard", path: "/dashboard" },
//     { name: "Teacher", path: "/teacherlist" },
//     { name: "Student", path: "/student-Table" },
//     { name: "Attendance", path: "/student-Table" },
//     // { name: "Admin", path: "/admin" },
//     { name: "Assessment", path: "/assessment" },
//     { name: "Task", path: "/task" },
//   ];

//   // Top stat cards (sample data)
//   const topStats = [
//     {
//       title: "Fee Pending This Year",
//       value: "2450",
//       total: "5000",
//       variant: "warning",
//     },
//     {
//       title: "Monthly Fee Collection",
//       value: "₹ 8,00,000",
//       sub: "This Month",
//       variant: "success",
//     },
//     {
//       title: "Expenses This Month",
//       value: "₹ 5,72,136",
//       variant: "danger",
//     },
//     {
//       title: "Profit This Month",
//       value: "₹ 3,27,864",
//       variant: "info",
//     },
//     {
//       title: "Total Class Present Today",
//       value: "72/80",
//       variant: "primary",
//     },
//     {
//       title: "Students Present Today",
//       value: "4385/5000",
//       variant: "success",
//     },
//     {
//       title: "Staff Present Today",
//       value: "40/40",
//       variant: "info",
//     },
//     {
//       title: "Campus, Labs & Vehicles",
//       value: "21/24",
//       variant: "secondary",
//     },
//   ];

//   // Fee collection vs expenses bar data (approx like image)
//   const feeBarData = [
//     { month: "Jan", income: 90, expense: 60 },
//     { month: "Feb", income: 80, expense: 55 },
//     { month: "Mar", income: 95, expense: 70 },
//     { month: "Apr", income: 85, expense: 65 },
//     { month: "May", income: 92, expense: 72 },
//     { month: "Jun", income: 88, expense: 68 },
//     { month: "Jul", income: 96, expense: 75 },
//     { month: "Aug", income: 93, expense: 70 },
//     { month: "Sep", income: 89, expense: 66 },
//     { month: "Oct", income: 91, expense: 69 },
//     { month: "Nov", income: 87, expense: 64 },
//     { month: "Dec", income: 94, expense: 71 },
//   ];

//   // Simple line chart style data for income vs expense trend
//   const incomeLineData = [50, 65, 60, 75, 70, 85, 80, 90, 88, 95, 92, 98];
//   const expenseLineData = [40, 45, 48, 55, 60, 65, 68, 70, 72, 74, 76, 78];
//   const months = [
//     "Jan",
//     "Feb",
//     "Mar",
//     "Apr",
//     "May",
//     "Jun",
//     "Jul",
//     "Aug",
//     "Sep",
//     "Oct",
//     "Nov",
//     "Dec",
//   ];

//   // For the simple CSS line chart, compute SVG points
//   const buildLinePoints = (data) => {
//     const maxVal = 100;
//     const width = 100;
//     const height = 50;
//     const step = width / (data.length - 1);
//     return data
//       .map((v, i) => {
//         const x = i * step;
//         const y = height - (v / maxVal) * height;
//         return `${x},${y}`;
//       })
//       .join(" ");
//   };

//   const incomePoints = buildLinePoints(incomeLineData);
//   const expensePoints = buildLinePoints(expenseLineData);

//   return (
//     <Container
//       fluid
//       className="p-0"
//       style={{ minHeight: "100vh", backgroundColor: "#f3f4f6" }}
//     >
//       <Row className="g-0">
//         {/* Sidebar */}
//         <Col md={2} className="bg-primary text-white d-flex flex-column">
//           <div className="p-3 border-bottom border-primary-subtle">
//             <h5 className="fw-bold mb-0">School Time</h5>
//           </div>

//           <Nav className="flex-column p-2 mt-2">
//             {navItems.map((item, idx) => (
//               <Button
//                 key={item.name}
//                 variant={idx === 0 ? "light" : "link"}
//                 className={`text-start mb-1 ${
//                   idx === 0 ? "text-primary fw-semibold" : "text-white"
//                 }`}
//                 style={{
//                   borderRadius: "20px",
//                   fontSize: "14px",
//                   padding: "6px 12px",
//                 }}
//                 onClick={() => navigate(item.path)}
//               >
//                 {item.name}
//               </Button>
//             ))}
//           </Nav>
//         </Col>

//         {/* Main content */}
//         <Col md={10} className="bg-light">
//           <div className="p-3">
//             {/* Top bar */}
//             <Navbar bg="white" className="shadow-sm rounded mb-3 px-3">
//               <Navbar.Brand className="fw-semibold">Admin Dashboard</Navbar.Brand>
//               <Navbar.Toggle />
//               <Navbar.Collapse className="justify-content-end">
//                 <InputGroup className="me-3" style={{ maxWidth: "260px" }}>
//                   <Form.Control
//                     placeholder="Search..."
//                     style={{ fontSize: "0.85rem" }}
//                   />
//                 </InputGroup>
//                 <div className="d-flex align-items-center">
//                   <div
//                     className="rounded-circle bg-primary d-flex align-items-center justify-content-center text-white fw-bold me-2"
//                     style={{ width: 36, height: 36 }}
//                   >
//                     A
//                   </div>
//                   <div>
//                     <div className="fw-semibold" style={{ fontSize: "0.9rem" }}>
//                       Admin User
//                     </div>
//                     <div className="text-muted" style={{ fontSize: "0.75rem" }}>
//                       Administrator
//                     </div>
//                   </div>
//                 </div>
//               </Navbar.Collapse>
//             </Navbar>

//             {/* Navigation quick buttons row */}
//             <Row className="mb-3">
//               <Col>
//                 <Card className="border-0 shadow-sm">
//                   <Card.Body className="d-flex flex-wrap gap-2">
//                     <Button
//                       size="sm"
//                       variant="primary"
//                       onClick={() => navigate("/")}
//                     >
//                       + Add New Teacher
//                     </Button>
//                     <Button
//                       size="sm"
//                       variant="primary"
//                       onClick={() => navigate("/student-details")}
//                     >
//                       + Add New Student
//                     </Button>
//                     <Button
//                       size="sm"
//                       variant="primary"
//                       onClick={() => navigate("/add-task")}
//                     >
//                       + Add New Task
//                     </Button>
//                     <Button
//                       size="sm"
//                       variant="outline-secondary"
//                       onClick={() => navigate("/student-Table")}
//                     >
//                       View Students
//                     </Button>
//                     <Button
//                       size="sm"
//                       variant="outline-secondary"
//                       onClick={() => navigate("/teacherlist")}
//                     >
//                       View Teachers
//                     </Button>
//                     <Button
//                       size="sm"
//                       variant="outline-secondary"
//                       onClick={() => navigate("/fees")}
//                     >
//                       View Fees Details
//                     </Button>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             </Row>

//             {/* Top stats grid similar to image */}
//             <Row className="gy-3 mb-3">
//               {topStats.map((s, i) => (
//                 <Col key={i} lg={3} md={4} sm={6}>
//                   <Card className="shadow-sm border-0 h-100">
//                     <Card.Body className="py-2">
//                       <div
//                         className="text-muted"
//                         style={{ fontSize: "0.78rem" }}
//                       >
//                         {s.title}
//                       </div>
//                       <div
//                         className="fw-bold mt-1"
//                         style={{ fontSize: "1rem", color: "#111827" }}
//                       >
//                         {s.value}
//                       </div>
//                       {s.total && (
//                         <div
//                           className="text-muted"
//                           style={{ fontSize: "0.75rem" }}
//                         >
//                           of {s.total}
//                         </div>
//                       )}
//                       <div className="mt-2">
//                         <ProgressBar
//                           now={65}
//                           variant={s.variant}
//                           style={{ height: 5, borderRadius: 20 }}
//                         />
//                       </div>
//                     </Card.Body>
//                   </Card>
//                 </Col>
//               ))}
//             </Row>

//             {/* Middle row: Fee bar chart + Income/Expense summary */}
//             <Row className="gy-3 mb-3">
//               {/* Fee Collection and Expenses bar chart */}
//               <Col lg={8}>
//                 <Card className="shadow-sm border-0 h-100">
//                   <Card.Body>
//                     <div className="d-flex justify-content-between align-items-center mb-2">
//                       <div>
//                         <div className="fw-semibold">
//                           Fee Collection and Expenses
//                         </div>
//                         <div
//                           className="text-muted"
//                           style={{ fontSize: "0.75rem" }}
//                         >
//                           Session 2024–2025
//                         </div>
//                       </div>
//                       <div className="d-flex align-items-center gap-2">
//                         <span
//                           className="badge bg-success-subtle text-success border border-success-subtle"
//                           style={{ fontSize: "0.7rem" }}
//                         >
//                           ■ Income
//                         </span>
//                         <span
//                           className="badge bg-danger-subtle text-danger border border-danger-subtle"
//                           style={{ fontSize: "0.7rem" }}
//                         >
//                           ■ Expense
//                         </span>
//                       </div>
//                     </div>

//                     <div
//                       className="position-relative"
//                       style={{ height: 260, marginTop: 10 }}
//                     >
//                       {/* Y Axis labels */}
//                       <div
//                         className="position-absolute h-100 d-flex flex-column justify-content-between text-muted"
//                         style={{ left: 0, top: 0, width: 40, fontSize: "0.7rem" }}
//                       >
//                         <span>100%</span>
//                         <span>75%</span>
//                         <span>50%</span>
//                         <span>25%</span>
//                         <span>0%</span>
//                       </div>

//                       {/* Bars */}
//                       <div
//                         className="position-absolute h-100 d-flex align-items-end justify-content-between"
//                         style={{ left: 50, right: 0, bottom: 20 }}
//                       >
//                         {feeBarData.map((m, idx) => (
//                           <div
//                             key={idx}
//                             className="d-flex flex-column align-items-center"
//                             style={{ width: "6%" }}
//                           >
//                             <div
//                               className="d-flex align-items-end"
//                               style={{ height: 180, width: "100%" }}
//                             >
//                               <div
//                                 className="bg-success rounded-top"
//                                 style={{
//                                   width: "45%",
//                                   height: `${m.income * 1.5}px`,
//                                   opacity: 0.9,
//                                 }}
//                               />
//                               <div
//                                 className="bg-danger rounded-top ms-1"
//                                 style={{
//                                   width: "45%",
//                                   height: `${m.expense * 1.5}px`,
//                                   opacity: 0.9,
//                                 }}
//                               />
//                             </div>
//                             <div
//                               className="mt-1 text-muted"
//                               style={{ fontSize: "0.7rem" }}
//                             >
//                               {m.month}
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </Card.Body>
//                 </Card>
//               </Col>

//               {/* Income / Expense pie-style summary */}
//               <Col lg={4}>
//                 <Card className="shadow-sm border-0 h-100">
//                   <Card.Body>
//                     <div className="fw-semibold mb-2">
//                       Income June 2024
//                     </div>
//                     <div className="d-flex align-items-center mb-3">
//                       {/* Simple donut using CSS */}
//                       <div
//                         className="position-relative me-3"
//                         style={{ width: 120, height: 120 }}
//                       >
//                         <div
//                           style={{
//                             width: "100%",
//                             height: "100%",
//                             borderRadius: "50%",
//                             background:
//                               "conic-gradient(#22c55e 0 55%, #3b82f6 55% 80%, #f97316 80% 100%)",
//                           }}
//                         />
//                         <div
//                           className="position-absolute top-50 start-50 translate-middle bg-white rounded-circle d-flex flex-column align-items-center justify-content-center"
//                           style={{ width: 70, height: 70 }}
//                         >
//                           <div
//                             style={{
//                               fontSize: "0.75rem",
//                               color: "#6b7280",
//                             }}
//                           >
//                             Total
//                           </div>
//                           <div
//                             className="fw-bold"
//                             style={{ fontSize: "0.9rem" }}
//                           >
//                             ₹ 7,92,166
//                           </div>
//                         </div>
//                       </div>

//                       <div style={{ fontSize: "0.8rem" }}>
//                         <div className="mb-1">
//                           <span className="badge bg-success me-1">■</span>
//                           Tuition Fee – 55%
//                         </div>
//                         <div className="mb-1">
//                           <span className="badge bg-primary me-1">■</span>
//                           Transport – 25%
//                         </div>
//                         <div>
//                           <span className="badge bg-warning text-dark me-1">
//                             ■
//                           </span>
//                           Hostel & Others – 20%
//                         </div>
//                       </div>
//                     </div>

//                     <div className="fw-semibold mb-1">
//                       Expense June 2024
//                     </div>
//                     <div className="d-flex align-items-center">
//                       <div
//                         className="position-relative me-3"
//                         style={{ width: 120, height: 120 }}
//                       >
//                         <div
//                           style={{
//                             width: "100%",
//                             height: "100%",
//                             borderRadius: "50%",
//                             background:
//                               "conic-gradient(#ef4444 0 50%, #0ea5e9 50% 80%, #a855f7 80% 100%)",
//                           }}
//                         />
//                         <div
//                           className="position-absolute top-50 start-50 translate-middle bg-white rounded-circle d-flex flex-column align-items-center justify-content-center"
//                           style={{ width: 70, height: 70 }}
//                         >
//                           <div
//                             style={{
//                               fontSize: "0.75rem",
//                               color: "#6b7280",
//                             }}
//                           >
//                             Total
//                           </div>
//                           <div
//                             className="fw-bold"
//                             style={{ fontSize: "0.9rem" }}
//                           >
//                             ₹ 5,12,430
//                           </div>
//                         </div>
//                       </div>

//                       <div style={{ fontSize: "0.8rem" }}>
//                         <div className="mb-1">
//                           <span className="badge bg-danger me-1">■</span>
//                           Salary – 50%
//                         </div>
//                         <div className="mb-1">
//                           <span className="badge bg-info text-dark me-1">
//                             ■
//                           </span>
//                           Maintenance – 30%
//                         </div>
//                         <div>
//                           <span className="badge bg-purple text-light me-1">
//                             ■
//                           </span>
//                           Utilities – 20%
//                         </div>
//                       </div>
//                     </div>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             </Row>

//             {/* Bottom row: simple line chart like image */}
//             <Row className="gy-3 mb-3">
//               <Col lg={12}>
//                 <Card className="shadow-sm border-0">
//                   <Card.Body>
//                     <div className="d-flex justify-content-between align-items-center mb-2">
//                       <div>
//                         <div className="fw-semibold">
//                           Income vs Expense Trend
//                         </div>
//                         <div
//                           className="text-muted"
//                           style={{ fontSize: "0.75rem" }}
//                         >
//                           Monthly comparison for current year
//                         </div>
//                       </div>
//                       <div className="d-flex gap-2">
//                         <span
//                           className="badge bg-success-subtle text-success border border-success-subtle"
//                           style={{ fontSize: "0.7rem" }}
//                         >
//                           ● Income
//                         </span>
//                         <span
//                           className="badge bg-danger-subtle text-danger border border-danger-subtle"
//                           style={{ fontSize: "0.7rem" }}
//                         >
//                           ● Expense
//                         </span>
//                       </div>
//                     </div>

//                     {/* SVG line chart */}
//                     <div style={{ height: 220 }}>
//                       <svg
//                         viewBox="0 0 100 60"
//                         width="100%"
//                         height="100%"
//                         preserveAspectRatio="none"
//                       >
//                         {/* Grid lines */}
//                         {[10, 20, 30, 40, 50].map((y, idx) => (
//                           <line
//                             key={idx}
//                             x1="0"
//                             x2="100"
//                             y1={y}
//                             y2={y}
//                             stroke="#e5e7eb"
//                             strokeWidth="0.2"
//                           />
//                         ))}
//                         {/* Income area / line */}
//                         <polyline
//                           fill="none"
//                           stroke="#22c55e"
//                           strokeWidth="1.5"
//                           points={incomePoints}
//                         />
//                         {/* Expense line */}
//                         <polyline
//                           fill="none"
//                           stroke="#ef4444"
//                           strokeWidth="1.5"
//                           points={expensePoints}
//                         />
//                       </svg>
//                       <div className="d-flex justify-content-between mt-1 text-muted">
//                         {months.map((m) => (
//                           <span
//                             key={m}
//                             style={{ fontSize: "0.7rem", width: "8%", textAlign: "center" }}
//                           >
//                             {m}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             </Row>
//           </div>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default AdminDashboard;







import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Nav,
  Navbar,
  Form,
  InputGroup,
  Badge,
  ProgressBar,
} from "react-bootstrap";

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Sidebar navigation items
  const navItems = [
    { name: "Admin Dashboard", path: "/dashboard" },
    { name: "Teacher", path: "/teacherlist" },
    { name: "Student", path: "/student-Table" },
    { name: "Attendance", path: "/student-Table" },
    { name: "Assessment", path: "/assesment" },
    { name: "Task", path: "/task" },
  ];

  // Top stat cards (sample data)
  const topStats = [
    {
      title: "Fee Pending This Year",
      value: "2450",
      total: "5000",
      variant: "warning",
    },
    {
      title: "Monthly Fee Collection",
      value: "₹ 8,00,000",
      sub: "This Month",
      variant: "success",
    },
    {
      title: "Expenses This Month",
      value: "₹ 5,72,136",
      variant: "danger",
    },
    {
      title: "Profit This Month",
      value: "₹ 3,27,864",
      variant: "info",
    },
    {
      title: "Total Class Present Today",
      value: "72/80",
      variant: "primary",
    },
    {
      title: "Students Present Today",
      value: "4385/5000",
      variant: "success",
    },
    {
      title: "Staff Present Today",
      value: "35/40",
      variant: "info",
    },
    {
      title: "Campus, Labs & Vehicles",
      value: "21/24",
      variant: "secondary",
    },
  ];

  // Fee collection vs expenses bar data
  const feeBarData = [
    { month: "Jan", income: 90, expense: 60 },
    { month: "Feb", income: 80, expense: 55 },
    { month: "Mar", income: 95, expense: 70 },
    { month: "Apr", income: 85, expense: 65 },
    { month: "May", income: 92, expense: 72 },
    { month: "Jun", income: 88, expense: 68 },
    { month: "Jul", income: 96, expense: 75 },
    { month: "Aug", income: 93, expense: 70 },
    { month: "Sep", income: 89, expense: 66 },
    { month: "Oct", income: 91, expense: 69 },
    { month: "Nov", income: 87, expense: 64 },
    { month: "Dec", income: 94, expense: 71 },
  ];

  // Operational expenses data
  const operationalExpenses = [
    { name: "Electricity Bill", amount: "₹ 1,25,000", status: "Paid", color: "#f59e0b", icon: "⚡" },
    { name: "School Maintenance", amount: "₹ 2,50,000", status: "Pending", color: "#3b82f6", icon: "🏫" },
    { name: "Insurance Premium", amount: "₹ 75,000", status: "Paid", color: "#10b981", icon: "🛡️" },
    { name: "Taxes", amount: "₹ 1,50,000", status: "Due Soon", color: "#ef4444", icon: "📊" },
    { name: "Water Supply", amount: "₹ 45,000", status: "Paid", color: "#0ea5e9", icon: "💧" },
    { name: "Internet & Phone", amount: "₹ 32,000", status: "Paid", color: "#8b5cf6", icon: "🌐" },
  ];

  // Monthly budget allocation
  const budgetAllocation = [
    { category: "Academic Resources", allocated: "₹ 3,00,000", used: "₹ 2,45,000", percentage: 82, color: "primary" },
    { category: "Infrastructure", allocated: "₹ 4,50,000", used: "₹ 3,80,000", percentage: 84, color: "success" },
    { category: "Staff Welfare", allocated: "₹ 2,00,000", used: "₹ 1,95,000", percentage: 98, color: "warning" },
    { category: "Student Activities", allocated: "₹ 1,50,000", used: "₹ 1,10,000", percentage: 73, color: "info" },
  ];

  // Simple line chart style data for income vs expense trend
  const incomeLineData = [50, 65, 60, 75, 70, 85, 80, 90, 88, 95, 92, 98];
  const expenseLineData = [40, 45, 48, 55, 60, 65, 68, 70, 72, 74, 76, 78];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // For the simple CSS line chart, compute SVG points
  const buildLinePoints = (data) => {
    const maxVal = 100;
    const width = 100;
    const height = 50;
    const step = width / (data.length - 1);
    return data
      .map((v, i) => {
        const x = i * step;
        const y = height - (v / maxVal) * height;
        return `${x},${y}`;
      })
      .join(" ");
  };

  const incomePoints = buildLinePoints(incomeLineData);
  const expensePoints = buildLinePoints(expenseLineData);

  return (
    <Container
      fluid
      className="p-0"
      style={{ minHeight: "100vh", backgroundColor: "#f8fafc" }}
    >
      <Row className="g-0">
        {/* Sidebar */}
        <Col md={3} lg={2} className="bg-white border-end">
          <div className="p-3">
            <h5 className="text-primary fw-bold mb-4">Infant Jesus (IJMS)</h5>
            <Nav className="flex-column">
              {navItems.map((item, idx) => (
                <Button
                  key={item.name}
                  variant={idx === 0 ? "primary" : "light"}
                  className={`mb-2 text-start ${idx === 0 ? 'active' : ''}`}
                  onClick={() => navigate(item.path)}
                  style={{
                    borderRadius: "50px",
                    padding: "10px 16px",
                    fontSize: "14px",
                    fontWeight: idx === 0 ? "600" : "400",
                    border: "none",
                    boxShadow: idx === 0 ? "0 2px 4px rgba(79, 70, 229, 0.2)" : "none",
                  }}
                >
                  {item.name}
                </Button>
              ))}
            </Nav>
          </div>
        </Col>

        {/* Main content */}
        <Col md={9} lg={10} className="bg-light">
          <div className="p-4">
            {/* Top bar */}
            <Navbar bg="transparent" className="mb-4 px-0">
              <Navbar.Brand className="fw-bold fs-4">Admin Dashboard</Navbar.Brand>
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                <InputGroup className="me-3" style={{ maxWidth: "300px" }}>
                  <Form.Control
                    placeholder="Search..."
                    className="rounded-pill"
                  />
                </InputGroup>
                <div className="d-flex align-items-center border rounded-pill p-2 bg-white">
                  <div className="bg-danger bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-2" 
                       style={{ width: "40px", height: "40px" }}>
                    <span className="fw-bold text-danger">A</span>
                  </div>
                  <div>
                    <div className="fw-bold">Admin User</div>
                    <div className="text-muted small">Administrator</div>
                  </div>
                </div>
              </Navbar.Collapse>
            </Navbar>

            {/* Navigation quick buttons row */}
            <Row className="mb-4">
              <Col>
                <Card className="border-0 shadow-sm">
                  <Card.Body className="d-flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => navigate("/signup")}
                    >
                      + Add New Teacher
                    </Button>
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => navigate("/student-details")}
                    >
                      + Add New Student
                    </Button>
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => navigate("/task")}
                    >
                      + Add New Task
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-secondary"
                      onClick={() => navigate("/student-Table")}
                    >
                      View Students
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-secondary"
                      onClick={() => navigate("/teacherlist")}
                    >
                      View Teachers
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-secondary"
                      onClick={() => navigate("/fees")}
                    >
                      View Fees Details
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* Top stats grid similar to image */}
            <Row className="gy-3 mb-4">
              {topStats.map((s, i) => (
                <Col key={i} lg={3} md={4} sm={6}>
                  <Card className="shadow-sm border-0 h-100">
                    <Card.Body className="py-2">
                      <div
                        className="text-muted"
                        style={{ fontSize: "0.78rem" }}
                      >
                        {s.title}
                      </div>
                      <div
                        className="fw-bold mt-1"
                        style={{ fontSize: "1rem", color: "#111827" }}
                      >
                        {s.value}
                      </div>
                      {s.total && (
                        <div
                          className="text-muted"
                          style={{ fontSize: "0.75rem" }}
                        >
                          of {s.total}
                        </div>
                      )}
                      <div className="mt-2">
                        <ProgressBar
                          now={65}
                          variant={s.variant}
                          style={{ height: 5, borderRadius: 20 }}
                        />
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

            {/* Middle row: Fee bar chart + Income/Expense summary */}
            <Row className="gy-3 mb-4">
              {/* Fee Collection and Expenses bar chart */}
              <Col lg={8}>
                <Card className="shadow-sm border-0 h-100">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <div>
                        <div className="fw-semibold">
                          Fee Collection and Expenses
                        </div>
                        <div
                          className="text-muted"
                          style={{ fontSize: "0.75rem" }}
                        >
                          Session 2024–2025
                        </div>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <span
                          className="badge bg-success-subtle text-success border border-success-subtle"
                          style={{ fontSize: "0.7rem" }}
                        >
                          ■ Income
                        </span>
                        <span
                          className="badge bg-danger-subtle text-danger border border-danger-subtle"
                          style={{ fontSize: "0.7rem" }}
                        >
                          ■ Expense
                        </span>
                      </div>
                    </div>

                    <div
                      className="position-relative"
                      style={{ height: 260, marginTop: 10 }}
                    >
                      {/* Y Axis labels */}
                      <div
                        className="position-absolute h-100 d-flex flex-column justify-content-between text-muted"
                        style={{ left: 0, top: 0, width: 40, fontSize: "0.7rem" }}
                      >
                        <span>100%</span>
                        <span>75%</span>
                        <span>50%</span>
                        <span>25%</span>
                        <span>0%</span>
                      </div>

                      {/* Bars */}
                      <div
                        className="position-absolute h-100 d-flex align-items-end justify-content-between"
                        style={{ left: 50, right: 0, bottom: 20 }}
                      >
                        {feeBarData.map((m, idx) => (
                          <div
                            key={idx}
                            className="d-flex flex-column align-items-center"
                            style={{ width: "6%" }}
                          >
                            <div
                              className="d-flex align-items-end"
                              style={{ height: 180, width: "100%" }}
                            >
                              <div
                                className="bg-success rounded-top"
                                style={{
                                  width: "45%",
                                  height: `${m.income * 1.5}px`,
                                  opacity: 0.9,
                                }}
                              />
                              <div
                                className="bg-danger rounded-top ms-1"
                                style={{
                                  width: "45%",
                                  height: `${m.expense * 1.5}px`,
                                  opacity: 0.9,
                                }}
                              />
                            </div>
                            <div
                              className="mt-1 text-muted"
                              style={{ fontSize: "0.7rem" }}
                            >
                              {m.month}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Additional Content: Operational Expenses */}
                    <div className="mt-4 pt-4 border-top">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                          <h6 className="fw-bold mb-1">Operational Expenses</h6>
                          <div className="text-muted small">Monthly Bills & Payments</div>
                        </div>
                        <Badge bg="light" text="dark" className="rounded-pill px-3 py-1">
                          Total: ₹ 6,77,000
                        </Badge>
                      </div>

                      <Row className="g-3 mb-4">
                        {operationalExpenses.map((expense, index) => (
                          <Col md={6} key={index}>
                            <div 
                              className="p-3 rounded d-flex align-items-center justify-content-between"
                              style={{ 
                                backgroundColor: `${expense.color}15`,
                                border: `1px solid ${expense.color}30`,
                                height: "85px"
                              }}
                            >
                              <div className="d-flex align-items-center">
                                <div 
                                  className="rounded-circle d-flex align-items-center justify-content-center me-3"
                                  style={{ 
                                    width: "40px", 
                                    height: "40px", 
                                    backgroundColor: `${expense.color}20`,
                                    fontSize: "18px"
                                  }}
                                >
                                  {expense.icon}
                                </div>
                                <div>
                                  <div className="fw-medium">{expense.name}</div>
                                  <div className="fw-bold" style={{ color: expense.color }}>
                                    {expense.amount}
                                  </div>
                                </div>
                              </div>
                              <Badge 
                                bg={expense.status === "Paid" ? "success" : 
                                    expense.status === "Pending" ? "warning" : "danger"} 
                                className="px-2 py-1"
                                style={{ fontSize: "0.7rem" }}
                              >
                                {expense.status}
                              </Badge>
                            </div>
                          </Col>
                        ))}
                      </Row>

                      {/* Budget Allocation Section */}
                      {/* <div className="mt-4">
                        <h6 className="fw-bold mb-3">Monthly Budget Allocation</h6>
                        <Row className="g-3">
                          {budgetAllocation.map((budget, index) => (
                            <Col md={6} key={index}>
                              <div className="bg-light rounded p-3">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                  <div className="fw-medium">{budget.category}</div>
                                  <Badge bg={budget.color} className="rounded-pill px-2 py-1">
                                    {budget.percentage}%
                                  </Badge>
                                </div>
                                <div className="d-flex justify-content-between small mb-2">
                                  <span className="text-muted">Allocated: {budget.allocated}</span>
                                  <span className="text-muted">Used: {budget.used}</span>
                                </div>
                                <ProgressBar 
                                  now={budget.percentage} 
                                  variant={budget.color}
                                  style={{ height: "6px" }}
                                />
                                <div className="d-flex justify-content-between mt-1 small">
                                  <span className="text-success">
                                    ₹ {parseInt(budget.allocated.replace(/[^0-9]/g, '')) - parseInt(budget.used.replace(/[^0-9]/g, ''))} remaining
                                  </span>
                                  <span className={budget.percentage > 90 ? "text-danger" : "text-muted"}>
                                    {budget.percentage > 90 ? "Over Budget" : "Within Budget"}
                                  </span>
                                </div>
                              </div>
                            </Col>
                          ))}
                        </Row>
                      </div> */}

                      {/* Quick Actions */}
                      <div className="mt-4 d-flex flex-wrap gap-2">
                        <Button variant="outline-primary" size="sm" className="d-flex align-items-center">
                          <span className="me-2">📋</span>
                          Generate Expense Report
                        </Button>
                        <Button variant="outline-success" size="sm" className="d-flex align-items-center">
                          <span className="me-2">💳</span>
                          Pay Pending Bills
                        </Button>
                        <Button variant="outline-warning" size="sm" className="d-flex align-items-center">
                          <span className="me-2">📊</span>
                          View Budget Analytics
                        </Button>
                        <Button variant="outline-info" size="sm" className="d-flex align-items-center">
                          <span className="me-2">📅</span>
                          Set Reminders
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              {/* Income / Expense pie-style summary */}
              <Col lg={4}>
                <Card className="shadow-sm border-0 h-100">
                  <Card.Body className="d-flex flex-column">
                    {/* Income June 2024 - Premium Styling */}
                    <div className="mb-4 pb-3 border-bottom">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="fw-bold mb-0" style={{ color: "#4f46e5" }}>
                          Income June 2024
                        </h6>
                        <Badge 
                          bg="success-subtle" 
                          text="success" 
                          className="rounded-pill px-3 py-1"
                          style={{ fontSize: "0.75rem" }}
                        >
                          +12.5%
                        </Badge>
                      </div>
                      
                      <div className="d-flex align-items-center justify-content-center position-relative mb-3">
                        {/* Premium Donut Chart */}
                        <div
                          className="position-relative"
                          style={{ width: "140px", height: "140px" }}
                        >
                          <div
                            style={{
                              width: "100%",
                              height: "100%",
                              borderRadius: "50%",
                              background: "conic-gradient(#10b981 0% 55%, #3b82f6 55% 80%, #f59e0b 80% 100%)",
                              boxShadow: "0 4px 12px rgba(16, 185, 129, 0.15)",
                              border: "2px solid #f1f5f9"
                            }}
                          />
                          <div
                            className="position-absolute top-50 start-50 translate-middle bg-white rounded-circle d-flex flex-column align-items-center justify-content-center"
                            style={{ 
                              width: "85px", 
                              height: "85px",
                              boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
                            }}
                          >
                            <div
                              className="text-muted"
                              style={{ fontSize: "0.7rem" }}
                            >
                              Total
                            </div>
                            <div
                              className="fw-bold fs-5"
                              style={{ color: "#10b981" }}
                            >
                              ₹ 7.92L
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Income Breakdown */}
                      <div className="mt-3">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <div className="d-flex align-items-center">
                            <div 
                              className="rounded-circle me-2" 
                              style={{ 
                                width: "10px", 
                                height: "10px", 
                                backgroundColor: "#10b981",
                                boxShadow: "0 1px 3px rgba(16, 185, 129, 0.4)"
                              }}
                            />
                            <span className="fw-medium" style={{ fontSize: "0.85rem" }}>
                              Tuition Fee
                            </span>
                          </div>
                          <div>
                            <span className="fw-bold" style={{ color: "#10b981", fontSize: "0.9rem" }}>55%</span>
                            <span className="text-muted ms-1" style={{ fontSize: "0.75rem" }}>₹ 4.35L</span>
                          </div>
                        </div>
                        
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <div className="d-flex align-items-center">
                            <div 
                              className="rounded-circle me-2" 
                              style={{ 
                                width: "10px", 
                                height: "10px", 
                                backgroundColor: "#3b82f6",
                                boxShadow: "0 1px 3px rgba(59, 130, 246, 0.4)"
                              }}
                            />
                            <span className="fw-medium" style={{ fontSize: "0.85rem" }}>
                              Transport
                            </span>
                          </div>
                          <div>
                            <span className="fw-bold" style={{ color: "#3b82f6", fontSize: "0.9rem" }}>25%</span>
                            <span className="text-muted ms-1" style={{ fontSize: "0.75rem" }}>₹ 1.98L</span>
                          </div>
                        </div>
                        
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="d-flex align-items-center">
                            <div 
                              className="rounded-circle me-2" 
                              style={{ 
                                width: "10px", 
                                height: "10px", 
                                backgroundColor: "#f59e0b",
                                boxShadow: "0 1px 3px rgba(245, 158, 11, 0.4)"
                              }}
                            />
                            <span className="fw-medium" style={{ fontSize: "0.85rem" }}>
                              Hostel & Others
                            </span>
                          </div>
                          <div>
                            <span className="fw-bold" style={{ color: "#f59e0b", fontSize: "0.9rem" }}>20%</span>
                            <span className="text-muted ms-1" style={{ fontSize: "0.75rem" }}>₹ 1.59L</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Expense June 2024 - Premium Styling */}
                    <div>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="fw-bold mb-0" style={{ color: "#dc2626" }}>
                          Expense June 2024
                        </h6>
                        <Badge 
                          bg="danger-subtle" 
                          text="danger" 
                          className="rounded-pill px-3 py-1"
                          style={{ fontSize: "0.75rem" }}
                        >
                          -8.2%
                        </Badge>
                      </div>
                      
                      <div className="d-flex align-items-center justify-content-center position-relative mb-3">
                        {/* Premium Donut Chart */}
                        <div
                          className="position-relative"
                          style={{ width: "140px", height: "140px" }}
                        >
                          <div
                            style={{
                              width: "100%",
                              height: "100%",
                              borderRadius: "50%",
                              background: "conic-gradient(#dc2626 0% 50%, #0ea5e9 50% 80%, #8b5cf6 80% 100%)",
                              boxShadow: "0 4px 12px rgba(220, 38, 38, 0.15)",
                              border: "2px solid #f1f5f9"
                            }}
                          />
                          <div
                            className="position-absolute top-50 start-50 translate-middle bg-white rounded-circle d-flex flex-column align-items-center justify-content-center"
                            style={{ 
                              width: "85px", 
                              height: "85px",
                              boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
                            }}
                          >
                            <div
                              className="text-muted"
                              style={{ fontSize: "0.7rem" }}
                            >
                              Total
                            </div>
                            <div
                              className="fw-bold fs-5"
                              style={{ color: "#dc2626" }}
                            >
                              ₹ 5.12L
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Expense Breakdown */}
                      <div className="mt-3">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <div className="d-flex align-items-center">
                            <div 
                              className="rounded-circle me-2" 
                              style={{ 
                                width: "10px", 
                                height: "10px", 
                                backgroundColor: "#dc2626",
                                boxShadow: "0 1px 3px rgba(220, 38, 38, 0.4)"
                              }}
                            />
                            <span className="fw-medium" style={{ fontSize: "0.85rem" }}>
                              Salary
                            </span>
                          </div>
                          <div>
                            <span className="fw-bold" style={{ color: "#dc2626", fontSize: "0.9rem" }}>50%</span>
                            <span className="text-muted ms-1" style={{ fontSize: "0.75rem" }}>₹ 2.56L</span>
                          </div>
                        </div>
                        
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <div className="d-flex align-items-center">
                            <div 
                              className="rounded-circle me-2" 
                              style={{ 
                                width: "10px", 
                                height: "10px", 
                                backgroundColor: "#0ea5e9",
                                boxShadow: "0 1px 3px rgba(14, 165, 233, 0.4)"
                              }}
                            />
                            <span className="fw-medium" style={{ fontSize: "0.85rem" }}>
                              Maintenance
                            </span>
                          </div>
                          <div>
                            <span className="fw-bold" style={{ color: "#0ea5e9", fontSize: "0.9rem" }}>30%</span>
                            <span className="text-muted ms-1" style={{ fontSize: "0.75rem" }}>₹ 1.54L</span>
                          </div>
                        </div>
                        
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="d-flex align-items-center">
                            <div 
                              className="rounded-circle me-2" 
                              style={{ 
                                width: "10px", 
                                height: "10px", 
                                backgroundColor: "#8b5cf6",
                                boxShadow: "0 1px 3px rgba(139, 92, 246, 0.4)"
                              }}
                            />
                            <span className="fw-medium" style={{ fontSize: "0.85rem" }}>
                              Utilities
                            </span>
                          </div>
                          <div>
                            <span className="fw-bold" style={{ color: "#8b5cf6", fontSize: "0.9rem" }}>20%</span>
                            <span className="text-muted ms-1" style={{ fontSize: "0.75rem" }}>₹ 1.02L</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* Bottom row: simple line chart like image */}
            <Row className="gy-3 mb-3">
              <Col lg={12}>
                <Card className="shadow-sm border-0">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <div>
                        <div className="fw-semibold">
                          Income vs Expense Trend
                        </div>
                        <div
                          className="text-muted"
                          style={{ fontSize: "0.75rem" }}
                        >
                          Monthly comparison for current year
                        </div>
                      </div>
                      <div className="d-flex gap-2">
                        <span
                          className="badge bg-success-subtle text-success border border-success-subtle"
                          style={{ fontSize: "0.7rem" }}
                        >
                          ● Income
                        </span>
                        <span
                          className="badge bg-danger-subtle text-danger border border-danger-subtle"
                          style={{ fontSize: "0.7rem" }}
                        >
                          ● Expense
                        </span>
                      </div>
                    </div>

                    {/* SVG line chart */}
                    <div style={{ height: 220 }}>
                      <svg
                        viewBox="0 0 100 60"
                        width="100%"
                        height="100%"
                        preserveAspectRatio="none"
                      >
                        {/* Grid lines */}
                        {[10, 20, 30, 40, 50].map((y, idx) => (
                          <line
                            key={idx}
                            x1="0"
                            x2="100"
                            y1={y}
                            y2={y}
                            stroke="#e5e7eb"
                            strokeWidth="0.2"
                          />
                        ))}
                        {/* Income area / line */}
                        <polyline
                          fill="none"
                          stroke="#22c55e"
                          strokeWidth="1.5"
                          points={incomePoints}
                        />
                        {/* Expense line */}
                        <polyline
                          fill="none"
                          stroke="#ef4444"
                          strokeWidth="1.5"
                          points={expensePoints}
                        />
                      </svg>
                      <div className="d-flex justify-content-between mt-1 text-muted">
                        {months.map((m) => (
                          <span
                            key={m}
                            style={{ fontSize: "0.7rem", width: "8%", textAlign: "center" }}
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;