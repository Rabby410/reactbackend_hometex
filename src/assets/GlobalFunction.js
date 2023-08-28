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
        localStorage.employee_type !== undefined && // Updated key name
        localStorage.employee_type === "4" // Updated key name
      ) {
        return true;
      }
      return false;
    },
    formatPrice(price) {
      return new Intl.NumberFormat("us").format(price) + "৳";
    },
  initSessionTimeout() {
    let sessionTimeout;

    const resetTimeout = () => {
      clearTimeout(sessionTimeout);
      sessionTimeout = setTimeout(() => {
        this.logOut();
      }, 130000); // 30 seconds in milliseconds
    };

    const events = ['mousemove', 'mousedown', 'keydown', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, resetTimeout);
    });

    resetTimeout();
  },
};

export default GlobalFunction;

// Initialize the session timeout when the page loads
GlobalFunction.initSessionTimeout();