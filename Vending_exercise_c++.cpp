//
//  VendingMachine.hpp
//  test_gtest_2
//
//  Created by Ashvin Coca on 6/8/20.
//  Copyright © 2020 Ashvin Coca. All rights reserved.
//


#include <string>
#include <sstream>
#include <iostream>
#include "VendingMachine.hpp"
#include "Item.hpp"

using namespace std;


ItemAndQuantity::ItemAndQuantity(Item item, int quantity) : item(item){
    this->quantity = quantity;
}

ItemAndQuantity::~ItemAndQuantity() {
    // nothing to cleanup I think
}


VendingMachine::VendingMachine() {
    //initialize ItemAndQuantity pointers to NULL
    balance = 0;
    // loop through I&Q
    for (int counter = 0; counter < 20; counter++) {
        contents[counter] = NULL;
    }
}

VendingMachine::~VendingMachine() {
    for (int counter =0; counter < 20; counter++) {
        if (contents[counter] == NULL ) {
            delete contents[counter];
        }
    }
    //destructor for cleanup of dynamic I&Q
}

double VendingMachine::getBalance() {
    return balance;
}

string VendingMachine::seeSelections(){
    ItemAndQuantity *current = NULL;
    int itemsAdded = 0;

    string output = "";
    for (int counter = 0; counter < 20; counter++) {
        current = contents[counter];
        // current = contents + counter;
        if (current != NULL) {
            if (itemsAdded) { // is greater than zero
                output += ":";
            }
            output += current->item.name;
            itemsAdded ++;
        }
    }
    return output;
}

int VendingMachine::countSelections() {
    ItemAndQuantity *current = NULL;
    int itemCounter = 0;

    string output = "";
    for (int counter = 0; counter < 20; counter++) {
        current = contents[counter];
        if (current != NULL) {
            itemCounter++;
        }
    }
    return itemCounter;

}

string VendingMachine::stock(ItemAndQuantity *moreSnacks [], int arraySize) {

    string message;

    int addSuccess = true;
    // go through each item in moreSnacks, and addOneItem...
    int counter = 0;
    for (counter = 0; (counter < arraySize) && addSuccess; counter++) {
        Item item = moreSnacks[counter]->item;
        addSuccess = addOneItemAndQuantity( * (moreSnacks[counter]) );
    }
    if (addSuccess) {
        message = "stocked";
    } else {
        message = "unable to add all items";
    }
    return message;
}

int VendingMachine::addOneItemAndQuantity(ItemAndQuantity itemAndQuantity) {
    
    
    
    //Not handling (a) no item (b) item qty <= 0
    //Item compare by code ONLY!!!

    Item item = itemAndQuantity.item;

    ItemAndQuantity * current = NULL;
    int found = false;
    int successFlag = false;

    // check to see if item type is already there
    for (int counter = 0; counter < 20 && !found ; counter ++) {
        current = contents[counter];
        if (
            ! (current == NULL)  // check for null pointer
            && itemAndQuantity.item.code == current->item.code) {
                found ++;
        }
    }
    // if there, add quantities
    if (found) {
        // no check for quantity > 0 here
        current->quantity += itemAndQuantity.quantity;
        successFlag ++;
    } else {
        // search vending machine for empty slot
        // if empty slot found, put item(s) in that slot
        for (int counter = 0; counter < 20 && !found ; counter ++) {
            if (contents[counter] == NULL) {
                contents[counter] = new ItemAndQuantity(itemAndQuantity.item, itemAndQuantity.quantity);
                successFlag ++;
                found ++;
            }
        }
        // if items not found , return false as successFlag
        // that requires NO CODE!
    }
    return successFlag;
}


void VendingMachine::deposit(double amount) {
    if (amount > 0 && amount < 20) {
        balance += amount;
    } // ignore amounts outside range and decimal precision
}

string VendingMachine::buy(char *snackName) {

    // should update inventory with bought snacks
    // update balance based on snack price
    // should notify customer when a snack is unavailable
    // should notify customer when a snack cost more than available balance

    //setup
    string message;


    //find snack
    ItemAndQuantity * current = NULL;
    int found = false;
    int counter = 0;
    for (counter = 0; counter < 20 && !found ; counter ++) {
        current = contents[counter];
        if (current != NULL
            && strcmp (snackName, current->item.name) == 0) {
            found ++;
        }
    }

    //if snack missing
        // say no snack message
    if (! found) {
        message  = "We don't have that snack";

    } else if (balance < current->item.price) {
        //if balance < price
        // say more money message
        ostringstream stream;
        stream  << "Insufficient funds" ;
        message = stream.str();


    } else { // found snack, got enough money
    //if price <= balance
        // give snack (message)
        // decrease balance
        // decrease quantity of snack
        // remove item if qty = 0
        balance -= current->item.price;
        current->quantity --;
        if (current->quantity == 0) { //remove from list
            delete contents[counter-1];
            contents[counter-1] = NULL;
        }
        message = "Enjoy";
    }

    return message;
}
