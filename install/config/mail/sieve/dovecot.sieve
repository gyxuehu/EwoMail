require ["fileinto"];

# rule:[Move Spam to Junk Folder]

if header :is "X-Spam-Flag" "YES"
{
    fileinto "Spam";
    stop;
}

if header :contains "Received-SPF" ["none"] {
    fileinto "Spam";
    stop;
}