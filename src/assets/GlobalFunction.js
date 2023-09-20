const GlobalFunction = {
  logOut() {
    localStorage.removeItem("email");
    localStorage.removeItem("phone");
    localStorage.removeItem("name");
    localStorage.removeItem("photo");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("employee_type");
    localStorage.removeItem("branch");
    window.location.href = window.location.origin;
  },
  isAdmin() {
    if (localStorage.role !== undefined && localStorage.role === "1") {
      return true;
    }
    return false;
  },
  hasAccessToProduct() {
    if (
      localStorage.employee_type !== undefined &&
      localStorage.employee_type === "3"
    ) {
      return true;
    }
    return false;
  },
  hasAccessToSale() {
    if (
      localStorage.employee_type !== undefined &&
      localStorage.employee_type === "4"
    ) {
      return true;
    }
    return false;
  },
  formatPrice(price, symbol = '৳') {
    return new Intl.NumberFormat("us").format(price) + symbol;
  },
  initSessionTimeout() {
    let sessionTimeout;

    const resetTimeout = () => {
      clearTimeout(sessionTimeout);
      sessionTimeout = setTimeout(() => {
        this.logOut();
      }, 30 * 60 * 1000); // 30 minutes in milliseconds
    };

    const events = ['mousemove', 'mousedown', 'keydown', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, resetTimeout);
    });

    resetTimeout();
  },
};

// Export the GlobalFunction object
export default GlobalFunction;

// Initialize the session timeout when the page loads
GlobalFunction.initSessionTimeout();
