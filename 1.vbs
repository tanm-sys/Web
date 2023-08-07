' Function to check if the current browser supports XMLHttpRequest Level 2
Function IsXMLHttpRequestLevel2Supported()
    On Error Resume Next
    Dim xhr
    Set xhr = CreateObject("MSXML2.ServerXMLHTTP.6.0")
    If Err.Number = 0 Then
        IsXMLHttpRequestLevel2Supported = True
    Else
        IsXMLHttpRequestLevel2Supported = False
    End If
    Set xhr = Nothing
End Function

' Function to add the X-Frame-Options header using XMLHttpRequest Level 2
Sub AddXFrameOptionsHeaderXMLHttpRequest2(url)
    On Error Resume Next
    Dim xhr
    Set xhr = CreateObject("MSXML2.ServerXMLHTTP.6.0")

    xhr.open "HEAD", url, False
    xhr.setRequestHeader "User-Agent", "XMLHTTP/1.0"
    xhr.send

    If xhr.status = 200 Then
        Dim responseHeaders, newHeaders
        responseHeaders = xhr.getAllResponseHeaders()

        If InStr(responseHeaders, "X-Frame-Options") = 0 Then
            newHeaders = responseHeaders & vbCrLf & "X-Frame-Options: SAMEORIGIN"
            Set xhr = CreateObject("MSXML2.ServerXMLHTTP.6.0")
            xhr.open "POST", url, False
            xhr.setRequestHeader "Content-Type", "application/x-www-form-urlencoded"
            xhr.setRequestHeader "X-Frame-Options", "SAMEORIGIN"
            xhr.send
        End If
    End If

    Set xhr = Nothing
End Sub

' Function to add the X-Frame-Options header using XMLHttpRequest Level 1
Sub AddXFrameOptionsHeaderXMLHttpRequest1(url)
    On Error Resume Next
    Dim xhr
    Set xhr = CreateObject("MSXML2.XMLHTTP")

    xhr.open "HEAD", url, False
    xhr.setRequestHeader "User-Agent", "XMLHTTP/1.0"
    xhr.send

    If xhr.status = 200 Then
        Dim responseHeaders, newHeaders
        responseHeaders = xhr.getAllResponseHeaders()

        If InStr(responseHeaders, "X-Frame-Options") = 0 Then
            newHeaders = responseHeaders & vbCrLf & "X-Frame-Options: SAMEORIGIN"
            Set xhr = CreateObject("MSXML2.XMLHTTP")
            xhr.open "POST", url, False
            xhr.setRequestHeader "Content-Type", "application/x-www-form-urlencoded"
            xhr.setRequestHeader "X-Frame-Options", "SAMEORIGIN"
            xhr.send
        End If
    End If

    Set xhr = Nothing
End Sub

' Main function to add X-Frame-Options header based on the browser's support for XMLHttpRequest Level 2
Sub AddXFrameOptionsHeader(url)
    If IsXMLHttpRequestLevel2Supported() Then
        AddXFrameOptionsHeaderXMLHttpRequest2 url
    Else
        AddXFrameOptionsHeaderXMLHttpRequest1 url
    End If
End Sub

' Call the function to add X-Frame-Options header
AddXFrameOptionsHeader "http://your-server-url.com/path-to-your-page" ' Replace with the actual URL of your page

