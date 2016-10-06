/*
This template just generates the stubs for these VMs. I copy and paste these elsewhere and extend them manually



class EventModelVM  {

        public Id: KnockoutObservable<string> = ko.observable(null);
        public OrderCount: KnockoutObservable<number> = ko.observable(0);
        public IdInt: KnockoutObservable<number> = ko.observable(0);
        public Editable: KnockoutObservable<boolean> = ko.observable(false);
        public Archived: KnockoutObservable<boolean> = ko.observable(false);
        public EventName: KnockoutObservable<string> = ko.observable(null);
        public EmailForInvoiceRequests: KnockoutObservable<string> = ko.observable(null);
        public AdditionalTextForReceiptEmail_Stripe: KnockoutObservable<string> = ko.observable(null);
        public AdditionalTextForReceiptEmail_Invoice: KnockoutObservable<string> = ko.observable(null);
        public ShortEventName: KnockoutObservable<string> = ko.observable(null);
        public Location: KnockoutObservable<string> = ko.observable(null);
        public MastheadImage: KnockoutObservable<string> = ko.observable(null);
        public SoldOutMessage: KnockoutObservable<string> = ko.observable(null);
        public ContactName: KnockoutObservable<string> = ko.observable(null);
        public ContactNumber: KnockoutObservable<string> = ko.observable(null);
        public EventDate: KnockoutObservable<Date> = ko.observable(null);
        public EventEndDate: KnockoutObservable<Date> = ko.observable(null);
        public Blurb: KnockoutObservable<string> = ko.observable(null);
        public TicketsPurchased: KnockoutObservableArray<TicketPurchasedVM> = ko.observableArray<TicketPurchasedVM>([]);
        public HashCode: KnockoutObservable<string> = ko.observable(null);
        public Tickets: KnockoutObservableArray<EventTicketVM> = ko.observableArray<EventTicketVM>([]);
        public Checksum: KnockoutObservable<string> = ko.observable(null);
        }
        
        class EventTicketVM  {

        public Name: KnockoutObservable<string> = ko.observable(null);
        public TicketTypeId: KnockoutObservable<string> = ko.observable(null);
        public NumberAvailable: KnockoutObservable<number> = ko.observable(0);
        public Cost: KnockoutObservable<number> = ko.observable(0);
        public StartDate: KnockoutObservable<Date> = ko.observable(null);
        public CutoffDate: KnockoutObservable<Date> = ko.observable(null);
        public CouponCode: KnockoutObservable<string> = ko.observable(null);
        public TicketDescription: KnockoutObservable<string> = ko.observable(null);
        public CouponCodeSHA: KnockoutObservable<string> = ko.observable(null);
        public Questions: KnockoutObservableArray<QuestionBaseVM> = ko.observableArray<QuestionBaseVM>([]);
        public ExpandTicket: KnockoutObservable<boolean> = ko.observable(false);
        public DiscountCodes: KnockoutObservableArray<DiscountCodeModelVM> = ko.observableArray<DiscountCodeModelVM>([]);
    }
        
        class QuestionBaseVM  {

        public QuestionText: KnockoutObservable<string> = ko.observable(null);
        public QuestionType: KnockoutObservable<string> = ko.observable(null);
        public Mandatory: KnockoutObservable<boolean> = ko.observable(false);
        public QuestionId: KnockoutObservable<string> = ko.observable(null);
        public SystemQuestion: KnockoutObservable<boolean> = ko.observable(false);
    }
        
        class QuestionTextVM extends QuestionBaseVM {

    }
        
        class QuestionFlagVM extends QuestionBaseVM {

    }
        
        class QuestionEmailVM extends QuestionBaseVM {

    }
        
        class QuestionDateVM extends QuestionBaseVM {

    }
        
        class QuestionSelectListVM extends QuestionBaseVM {

        public OptionsCSV: KnockoutObservable<string> = ko.observable(null);
    }
    

class DiscountCodeModelVM  {

        public DiscountCode: KnockoutObservable<string> = ko.observable(null);
        public DiscountCodeId: KnockoutObservable<string> = ko.observable(null);
        public DiscountCodeSHA: KnockoutObservable<string> = ko.observable(null);
        public Discount: KnockoutObservable<number> = ko.observable(0);
        public NumberAvailable: KnockoutObservable<number> = ko.observable(0);
        public NumberAlreadySold: KnockoutObservable<number> = ko.observable(0);
        public Comment: KnockoutObservable<string> = ko.observable(null);
        }
    

class EventHeaderModelVM  {

        public Id: KnockoutObservable<string> = ko.observable(null);
        public ShortEventName: KnockoutObservable<string> = ko.observable(null);
        public IdInt: KnockoutObservable<number> = ko.observable(0);
        public EventName: KnockoutObservable<string> = ko.observable(null);
        public EventDate: KnockoutObservable<Date> = ko.observable(null);
        public EventEndDate: KnockoutObservable<Date> = ko.observable(null);
        public Checksum: KnockoutObservable<string> = ko.observable(null);
        public Archived: KnockoutObservable<boolean> = ko.observable(false);
        public OrderCount: KnockoutObservable<number> = ko.observable(0);
        public JsonCompressed: KnockoutObservableArray<numberVM> = ko.observableArray<numberVM>([]);
        public Damien: KnockoutObservable<string> = ko.observable(null);
        public FormattedStartDate: KnockoutObservable<string> = ko.observable(null);
        }
    
*/ 
