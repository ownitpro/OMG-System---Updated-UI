# Troubleshooting

## Quick Fixes for Common Issues

## Header Issues

### Header Links Missing

**Symptoms:**
- Navigation links not showing
- Header appears broken
- Missing logo or menu

**Solutions:**
1. **Refresh page**
   - Hard refresh (Cmd+Shift+R / Ctrl+Shift+R)
   - Clear browser cache
   - Try incognito mode

2. **Check route**
   - Verify you're on correct route
   - Marketing pages use marketing header
   - App pages use in-app header
   - Demo pages use demo header

3. **Check layout**
   - Ensure correct layout is mounted
   - Verify no layout conflicts
   - Check for duplicate headers

### Double Sidebars

**Symptoms:**
- Two navigation sidebars visible
- Duplicate menus
- Layout conflicts

**Solutions:**
1. **Clear cache**
   - Clear browser cache
   - Clear localStorage
   - Hard refresh

2. **Check layout wrapper**
   - Ensure only one layout wrapper
   - Verify no nested layouts
   - Check for duplicate components

3. **Verify route structure**
   - Check route groups
   - Ensure correct layout hierarchy
   - Remove duplicate layout files

## Demo Issues

### Demo Seed Not Loading

**Symptoms:**
- Demo page shows empty
- No mock data visible
- API errors in console

**Solutions:**
1. **Navigate directly**
   - Go to `/demo/business` directly
   - Go to `/demo/personal` directly
   - Avoid redirects

2. **Check mock API routes**
   - Verify API routes exist
   - Check route handlers
   - Test API endpoints directly

3. **Check localStorage**
   - Clear localStorage
   - Refresh page
   - Re-seed if needed

### Demo Data Missing

**Symptoms:**
- No documents in vault
- No portals created
- Empty activity feeds

**Solutions:**
1. **Check mock data**
   - Verify mock data files exist
   - Check data structure
   - Verify imports

2. **Re-seed data**
   - Navigate away and back
   - Clear localStorage
   - Refresh page

3. **Check API responses**
   - Open browser DevTools
   - Check Network tab
   - Verify API responses

## Upload Issues

### Upload Fails

**Symptoms:**
- File doesn't upload
- Progress bar stuck
- Error messages

**Solutions:**
1. **Check file size**
   - Verify under size limit
   - Try smaller file
   - Check plan limits

2. **Check file type**
   - Verify supported format
   - Try different file type
   - Check file isn't corrupted

3. **Check network**
   - Verify internet connection
   - Try different network
   - Check firewall settings

4. **Check browser**
   - Try different browser
   - Clear cache
   - Disable extensions

### Upload Progress Stuck

**Symptoms:**
- Progress bar doesn't move
- Upload appears frozen
- No completion

**Solutions:**
1. **Wait and retry**
   - Large files take time
   - Wait 30 seconds
   - Check network activity

2. **Cancel and retry**
   - Cancel upload
   - Try smaller file first
   - Retry original file

3. **Check console**
   - Open DevTools
   - Check for errors
   - Review network requests

## Share Link Issues

### Link Doesn't Open

**Symptoms:**
- Link returns 404
- Page doesn't load
- Error message

**Solutions:**
1. **Check link status**
   - Verify link not expired
   - Check if link was revoked
   - Verify link URL correct

2. **Check PIN**
   - Verify PIN entered correctly
   - Try PIN again
   - Check for typos

3. **Try incognito**
   - Open in incognito window
   - Clear cookies
   - Test fresh session

### Watermark Not Showing

**Symptoms:**
- Document displays without watermark
- Watermark missing
- Viewer looks different

**Solutions:**
1. **Check share settings**
   - Verify watermark enabled
   - Check share configuration
   - Recreate share if needed

2. **Check browser**
   - Try different browser
   - Update browser
   - Check JavaScript enabled

3. **Clear cache**
   - Clear browser cache
   - Hard refresh
   - Try incognito

## Portal Issues

### Portal Invite Not Received

**Symptoms:**
- Email not delivered
- Invite link missing
- Client can't access

**Solutions:**
1. **Check email**
   - Verify email address
   - Check spam folder
   - Try alternate email

2. **Resend invite**
   - Go to Client Portals
   - Find portal
   - Click "Resend Invite"

3. **Provide direct link**
   - Generate new token
   - Provide portal URL
   - Include access instructions

### Portal Access Denied

**Symptoms:**
- Client can't login
   - Token not working
   - Access denied error

**Solutions:**
1. **Verify token**
   - Check token validity
   - Generate new token
   - Provide fresh link

2. **Check portal status**
   - Verify portal active
   - Check not archived
   - Confirm permissions

3. **Test access**
   - Try portal link
   - Verify token works
   - Check browser compatibility

## Performance Issues

### Slow Page Loads

**Symptoms:**
- Pages load slowly
- Timeouts
- Laggy interactions

**Solutions:**
1. **Check network**
   - Verify connection speed
   - Check for network issues
   - Try different network

2. **Clear cache**
   - Clear browser cache
   - Clear localStorage
   - Hard refresh

3. **Check browser**
   - Update browser
   - Close other tabs
   - Disable extensions

### Search Slow

**Symptoms:**
- Search takes long time
- Results delayed
- Timeout errors

**Solutions:**
1. **Narrow search**
   - Use filters
   - Add more criteria
   - Search by label first

2. **Check data size**
   - Large datasets slower
   - Use pagination
   - Optimize queries

3. **Retry search**
   - Wait and retry
   - Check network
   - Verify search index

## Getting Help

### Still Having Issues?

1. **Check documentation**
   - Review relevant guide
   - Search FAQ
   - Check troubleshooting

2. **Contact support**
   - Use Support page
   - Submit ticket
   - Include error details

3. **Report bug**
   - Document steps to reproduce
   - Include screenshots
   - Note browser/OS

