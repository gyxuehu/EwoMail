<?php

class EwoMailPasswordPlugin extends \RainLoop\Plugins\AbstractPlugin
{
	public function Init()
	{
		$this->addHook('main.fabrica', 'MainFabrica');
	}

	/**
	 * @return string
	 */
	public function Supported()
	{

		return '';
	}

	/**
	 * @param string $sName
	 * @param mixed $oProvider
	 */
	public function MainFabrica($sName, &$oProvider)
	{
		switch ($sName)
		{
			case 'change-password':

                include_once __DIR__.'/EwoMailPasswordDriver.php';

                $oProvider = new EwoMailPasswordDriver();
                $oProvider->SetLogger($this->Manager()->Actions()->Logger());
                //$oProvider->SetConfig($sDsn, $sUser, $sPassword);
                $oProvider->SetAllowedEmails(\strtolower(\trim($this->Config()->Get('plugin', 'allowed_emails', ''))));

				break;
		}
	}

	/**
	 * @return array
	 */
	public function configMapping()
	{
		return [];
	}
}