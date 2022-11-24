const Ticket = require('../models/Ticket');

class MyDB {
  constructor() {
    this.tickets = [];
  }

  /**
   * create new ticket
   * @param {String} username
   * @param {Number} price
   * @return {Ticket} return a ticket object
   */
  create(username, price) {
    const ticket = new Ticket(username, price);
    this.tickets.push(ticket);
    return ticket;
  }

  /**
   * find all tickets
   * @return
   */

  find() {
    return this.tickets;
  }

  /**
   * sell multiple ticket
   * @param {string} username
   * @param {number} price
   * @param {number} quantity
   * @return {Array<Ticket>} return array of tickets
   */
  bulkCreate(username, price, quantity) {
    const result = [];
    for (let i = 0; i < quantity; i++) {
      const ticket = this.create(username, price);
      result.push(ticket);
    }

    return result;
  }

  /**
   * single ticket
   * @param {string} ticketId
   */
  findById(ticketId) {
    const ticket = this.tickets.find(
      /**
       *
       * @param {Ticket} ticket
       */
      (ticket) => ticket.id === ticketId,
    );

    return ticket;
  }

  /**
   * find all ticket for a given user
   *  @param {string} username
   * @return {Array<Ticket>}
   */
  findByUsername(username) {
    const tickets = this.tickets.filter(
      /**
       *
       * @param {Ticket} ticket
       */
      (ticket) => ticket.username === username,
    );
    return tickets;
  }

  updateByUsername(username, ticketbody) {
    const tickets = this.findByUsername(username);
    const updatedTickets = tickets.map((item) => {
      item.username = ticketbody.username ?? item.username;
      item.price = ticketbody.price ? ticketbody.price : item.price;
      item.updatedAt = new Date();
      return { ...item };
    });
    return updatedTickets;
  }

  /**
   * update ticket info
   * @param {string} ticketId
   * @param {Object} ticketbody
   * @return {Ticket}
   */
  updateById(ticketId, ticketbody) {
    const ticket = this.findById(ticketId);

    ticket.username = ticketbody.username ?? ticket.username;
    ticket.price = ticketbody.price ? ticketbody.price : ticket.price;
    ticket.updatedAt = new Date();
    return ticket;
  }

  /**
   *
   * @param {String} username
   * @returns
   */
  deleteByUsername(username) {
    const tickets = this.findByUsername(username);
    const index = this.tickets.findIndex((item) => item.username === username);
    if (index !== -1) {
      this.tickets.splice(index, tickets.length);
      return true;
    }
    return false;
  }

  /**
   * delete ticket from db
   * @param {string} ticketid
   */
  deleteById(ticketid) {
    const index = this.tickets.findIndex((item) => item.id === ticketid);

    if (index !== -1) {
      this.tickets.splice(index, 1);
      return true;
    }
    return false;
  }

  /**
   * draw ticket
   * @param {number} winnerCount
   * @return {Array<Ticket>}
   */
  draw(winnerCount) {
    const indexes = new Array(winnerCount);

    let index = 0;
    while (index < winnerCount) {
      const winnerIndex = Math.floor(Math.random() * this.tickets.length);

      if (!indexes.includes(winnerIndex)) {
        indexes[index++] = winnerIndex;
        continue;
      }
    }

    const winners = indexes.map((index) => this.tickets[index]);
    return winners;
  }
}

const myDB = new MyDB();

module.exports = myDB;
