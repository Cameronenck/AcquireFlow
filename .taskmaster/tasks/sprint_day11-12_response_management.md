# Sprint Days 11-12: Response Management

## 🎯 Sprint Goal
Complete the automation loop by capturing and managing agent responses to offers.

## Priority
**HIGH - Complete the Loop**

## Status
Not Started

## Estimated Time
16 hours (2 days)

## Success Metrics
- Agent replies are automatically captured and threaded
- Response categorization with 80%+ accuracy
- Users can quickly identify and respond to interested agents
- Response rates and analytics visible in dashboard

## Requirements

### 1. Email Reply Capture & Threading
**Email Integration:**
- ✅ Webhook setup for email service (SendGrid/Mailgun)
- ✅ Automatic reply detection and parsing
- ✅ Thread original campaign messages with replies
- ✅ Extract reply content and metadata
- ✅ Handle forwarded and auto-reply messages
- ✅ Parse agent contact information from signatures

**Reply Processing:**
- ✅ Remove quoted original message from replies
- ✅ Extract key information (interest level, counter offers)
- ✅ Detect out-of-office and auto-reply messages
- ✅ Link replies to original campaign and property
- ✅ Store complete conversation history

### 2. SMS Response Capture & Management
**SMS Integration:**
- ✅ Twilio webhook for incoming SMS responses
- ✅ Thread SMS responses with original campaigns
- ✅ Handle STOP/OPT-OUT keywords automatically
- ✅ Extract phone numbers and message content
- ✅ Time zone aware response timestamps

**Response Handling:**
- ✅ Parse short SMS responses for intent
- ✅ Detect interest keywords ("interested", "yes", "call me")
- ✅ Handle rejection keywords ("not interested", "no", "stop")
- ✅ Forward complex responses for human review

### 3. Automatic Response Categorization
**AI-Powered Classification:**
- ✅ **Interested** - Agent shows clear interest or asks for more info
- ✅ **Counter Offer** - Agent proposes different terms or price
- ✅ **Not Interested** - Clear rejection or "not a fit"
- ✅ **Need More Info** - Agent requests additional details
- ✅ **Auto Reply** - Out of office or automated responses
- ✅ **Other** - Requires human review and classification

**Sentiment Analysis:**
- ✅ Positive, neutral, negative sentiment scoring
- ✅ Urgency detection (immediate response needed)
- ✅ Counter-offer amount extraction from text
- ✅ Preferred contact method detection
- ✅ Best time to call extraction

### 4. Response Dashboard & Management
**Response Inbox:**
- ✅ Unified inbox for all email and SMS responses
- ✅ Filter by response type, sentiment, campaign
- ✅ Sort by date, priority, response type
- ✅ Unread response counter and notifications
- ✅ Bulk actions for multiple responses

**Response Details View:**
- ✅ Complete conversation thread display
- ✅ Property details and original offer information
- ✅ Agent contact information and history
- ✅ Response categorization with confidence score
- ✅ Quick action buttons (call, email, mark as deal)

### 5. Quick Actions & Follow-up Communication
**Response Actions:**
- ✅ One-click "Mark as Deal" to create pipeline entry
- ✅ Quick reply templates for common responses
- ✅ Schedule follow-up reminders
- ✅ Forward to team member or assistant
- ✅ Add notes and tags to responses

**Follow-up Templates:**
- ✅ "Thank you for your interest" auto-replies
- ✅ "More information requested" follow-up emails
- ✅ "Schedule a call" appointment booking links
- ✅ "Counter offer received" negotiation templates
- ✅ Customizable follow-up sequences

## Acceptance Criteria
- [ ] 85%+ of email replies are captured and properly threaded
- [ ] 90%+ of SMS responses are captured and categorized
- [ ] Response categorization achieves 80%+ accuracy
- [ ] Response dashboard loads quickly with real-time updates
- [ ] Users can respond to interested agents within 2 minutes of notification
- [ ] Conversation history is complete and searchable
- [ ] Auto-replies and out-of-office messages are filtered appropriately
- [ ] Counter-offer amounts are extracted accurately when present

## Files to Create/Modify
- `/api/webhooks/email.ts` - Email webhook handler
- `/api/webhooks/sms.ts` - SMS webhook handler
- `/lib/responses/` - Response processing and categorization
- `/components/responses/ResponseInbox.tsx` - Response management UI
- `/components/responses/ResponseThread.tsx` - Conversation display
- `/components/responses/QuickActions.tsx` - Response action buttons
- `/lib/ai/sentiment.ts` - Response classification logic
- `/hooks/useResponses.ts` - Response state management

## Dependencies
- Sprint Days 8-10: Bulk Campaign Execution (must be completed)
- Email service webhook configuration
- SMS service webhook configuration
- AI/ML service for text classification (optional but recommended)
- Database schema for storing responses and conversations

## Technical Requirements
- Webhook endpoints for real-time response capture
- Text processing for content extraction and classification
- Real-time UI updates for new responses
- Search and filtering capabilities for response management
- Integration with deal pipeline creation

## Notes
This closes the automation loop and provides the intelligence needed to identify hot leads. The better the categorization accuracy, the more efficient users will be at following up on opportunities.

## Next Task Dependencies
- Sprint Days 13-14: Analytics & Polish depends on response data and metrics 