import DrawHelpDesk from "./DrawHelpDesk/DrawHelpDesk";
import DrawPopupTicket from "./DrawPopupAddTicket/DrawPopupTicket";
import DrawDelete from "./DrawDelete/DrawDelete";
import HelpDeskController from "./HelpDeskController/HelpDeskController";

const arr = [{
    id: 0,
    name: 'Тестовая заявка на работы',
    status: true,
    date: +Date.now(),
}]

const widget = new DrawHelpDesk();
const popup = new DrawPopupTicket();
const deletePopap = new DrawDelete();

const controller = new HelpDeskController(arr, widget, popup, deletePopap);

