class Alert
{
    body = {
        width: 0,
        height: 0,
    }
    size = {
        width: 450,
        height: 50
    }
    offset = {
        horizontal: 15,
        vertical: 15
    }
    element;
    alerts = [];
    constructor(referenceElement) {
        this.recalculateBodySize(referenceElement);
        this.element = referenceElement;
        this.element.addEventListener("resize", (e) => {
            console.log(e.target);
            
            this.recalculateBodySize(e.target);
            this.recalculateAlerts();
        });
    }

    recalculateBodySize(referenceElement) {
        this.body.width = referenceElement.clientWidth;
        this.body.height = referenceElement.clientHeight;
        console.log(this.body);   
    }

    setSize(width, height) {
        if(typeof width != "number"||typeof height != "number") {
            console.error(`width or height is not a number`);
            return;
        }
        this.size.width = width;
        this.size.height = height;
        this.recalculateAlerts();
    }

    setOffset(horizontal, vertical) {
        if(typeof horizontal != "number"||typeof vertical != "number") {
            console.error(`horizontal or vertical is not a number`);
            return;
        }
        this.offset.horizontal = horizontal;
        this.offset.vertical = vertical;
        this.recalculateAlerts();
    }

    alert(message_text) {
        this.popup(message_text, "alert")
    }

    warning(message_text) {
        this.popup(message_text, "warning")
    }

    notification(message_text) {
        this.popup(message_text, "notification");
    }

    popup(message_text, type) {
        this.recalculateBodySize(this.element);
        const alert = document.createElement("div");
        alert.style.position = "absolute";
        
        const size = this.calculateAlertSize();
        alert.style.width = size.width;
        alert.style.height = size.height;
        alert.classList.add("popup");
        alert.classList.add(type);
        alert.addEventListener("click", (e) => {
            alert.classList.add("clicked");
            setTimeout(() => {
                this.alerts.splice(this.alerts.indexOf(alert), 1);
                console.log(this.alerts);
                alert.remove();
                this.recalculateAlerts();
            },275);
        });
        this.alerts.push(alert);
        this.recalculateAlerts();
        console.log(this.alerts);
        const message = document.createElement("span");
        message.innerText = message_text;
        alert.appendChild(message);
        this.element.appendChild(alert);
    }

    calculateAlertSize() {
        return {
            "width": (this.size.width)+"px",
            "height": (this.size.height)+"px"
        }
    }

    recalculateAlertPosition(offset) {
        return {
            "width": (this.body.width-this.size.width-this.offset.horizontal)+"px",
            "height": (this.body.height-(this.size.height*offset)-(this.offset.vertical*offset))+"px",
        };
    }
    recalculateAlerts() {
        const size = this.calculateAlertSize();
        for(let i = this.alerts.length-1;i>=0; i--) {
            const position = this.recalculateAlertPosition(i+1)
            this.alerts[i].style.width = size.width;
            this.alerts[i].style.height = size.height;
            this.alerts[i].style.left = position.width;
            this.alerts[i].style.top = position.height;
        }
    }
}